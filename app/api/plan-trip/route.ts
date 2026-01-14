import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Gemini API
const apiKey = (process.env.GEMINI_API_KEY || '').trim();
const genAI = new GoogleGenerativeAI(apiKey);

// Debug Log: Check if key is loaded (only showing first 5 chars for security)
console.log(`Server API Key Status: Length=${apiKey.length}, StartsWith=${apiKey.substring(0, 5)}...`);

const SYSTEM_INSTRUCTION = `You are a one-shot itinerary generator for Gilgit-Baltistan tourism.

Analyze the user's input and return ONLY valid JSON in one of these formats:

1. IF the input is a VALID trip request (has Destination + Starting Location + Duration):
   Return:
   {
     "type": "itinerary",
     "timeline": [
       {
         "step_order": 1,
         "location_name": "Name of destination",
         "hotel_query": "Just the city/town name (e.g., 'Skardu')",
         "card_details": {
           "summary": "What to do/see at this location (2-3 sentences)",
           "image_keyword": "search keyword for images (e.g., 'hunza valley')"
         },
         "travel_to_next": {
           "has_next": true,
           "distance": "120 km",
           "duration": "3 hours",
           "mode": "car",
           "polyline_type": "road"
         }
       }
     ]
   }
   Note: For the LAST item, set "has_next": false and omit distance/duration/mode.

2. IF the input is MISSING required info (Starting Location or Duration):
   Return:
   {
     "type": "clarification",
     "message": "Specific feedback on what is missing. Example: 'Please tell me your starting location and how many days you want to travel.'"
   }

3. IF the input is IRRELEVANT to Gilgit-Baltistan tourism:
   Return:
   {
     "type": "irrelevant",
     "message": "I can only help plan trips for Gilgit-Baltistan. Please ask about destinations like Hunza, Skardu, Fairy Meadows, etc."
   }

4. IF the input asks for a DETAILED hour-by-hour plan for a specific location/day (e.g., "Detailed plan for Skardu on Day 1"):
   Return:
   {
     "type": "day_detail",
     "day_title": "Day X: Exploring [Location]",
     "schedule": [
       { "time": "08:00 AM", "activity": "Wake up and breakfast at your hotel" },
       { "time": "09:30 AM", "activity": "Visit [attraction] - description" },
       { "time": "12:00 PM", "activity": "Lunch at a local restaurant" },
       { "time": "02:00 PM", "activity": "Explore [another attraction]" },
       { "time": "05:00 PM", "activity": "Evening walk or shopping" },
       { "time": "07:00 PM", "activity": "Dinner and rest" }
     ]
   }
   Note: Provide 5-8 activities spread throughout the day with realistic timings.

IMPORTANT RULES:
- DO NOT simulate a conversation or ask follow-up questions beyond the clarification message.
- Return ONLY the JSON object, no markdown, no explanations.
- Popular destinations: Hunza Valley, Skardu, Fairy Meadows, Attabad Lake, Passu Cones, Khunjerab Pass, Deosai Plains, Shangrila, Baltit Fort, Naltar Valley.
- Use realistic travel times for mountain terrain (roads can be slow).`;

// Helper: Delay for retry logic
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: Clean markdown from text
function cleanText(text: string) {
    return text
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();
}

export async function POST(request: NextRequest) {
    try {
        // Check for API key
        if (!process.env.GEMINI_API_KEY) {
            console.error('API Key Missing');
            return NextResponse.json(
                {
                    type: 'error',
                    message: 'Gemini API key is not configured.'
                },
                { status: 500 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { userQuery } = body;

        if (!userQuery || typeof userQuery !== 'string') {
            return NextResponse.json(
                {
                    type: 'error',
                    message: 'Please provide a valid trip planning query.'
                },
                { status: 400 }
            );
        }

        // 1. Use the specific gemini-2.5-flash-lite model with Native JSON support
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash-lite',
            systemInstruction: SYSTEM_INSTRUCTION,
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        console.log(`Processing query: "${userQuery}"`);

        // --- RETRY LOGIC (Exponential Backoff) ---
        const MAX_RETRIES = 3;
        let text = "";

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                // Generate content
                const result = await model.generateContent(userQuery);
                const response = await result.response;
                text = response.text();
                break; // Success! Exit loop
            } catch (retryError: any) {
                const errorMessage = retryError.message || "";
                const isRateLimit = errorMessage.includes('429');
                const isOverloaded = errorMessage.includes('503');

                if ((isRateLimit || isOverloaded) && attempt < MAX_RETRIES) {
                    // Wait longer for each attempt: 2s, then 4s, then 8s
                    const waitTime = 2000 * Math.pow(2, attempt - 1);
                    console.warn(`⚠️ Attempt ${attempt} failed (Rate Limit/Overload). Retrying in ${waitTime}ms...`);
                    await delay(waitTime);
                } else {
                    // If it's a different error or we ran out of retries, throw it
                    throw retryError;
                }
            }
        }

        // 3. Update Parsing Logic with debug logs
        console.log("Raw Gemini Output:", text);

        try {
            // 2. Use JSON Cleaning Helper
            const cleanedJson = cleanText(text);
            const data = JSON.parse(cleanedJson);

            return NextResponse.json(data);
        } catch (parseError) {
            console.error("JSON Parsing Error:", parseError);
            console.error("Failed Text:", text);

            return NextResponse.json(
                {
                    type: "error",
                    message: "Failed to parse AI response. The model returned invalid JSON.",
                    rawResponse: text
                },
                { status: 500 }
            );
        }

    } catch (error: any) {
        // 4. Robust Error Logging
        console.error("❌ FULL ERROR DETAILS:", error);

        // If the error has a response property (common in fetch/axios errors), try to read it
        if (error.response && typeof error.response.text === 'function') {
            try {
                const errorText = await error.response.text();
                console.error("❌ GEMINI RESPONSE ERROR:", errorText);
            } catch (e) {
                console.error("❌ Could not read error response text");
            }
        }

        // Graceful "Quota Exceeded" Message
        if (error.message?.includes('429')) {
            return NextResponse.json({
                type: "irrelevant",
                message: "You have hit the free tier rate limit (2 requests/min) for this model. Please wait a moment and try again."
            });
        }

        return NextResponse.json(
            {
                type: "error",
                message: "Server Error: " + (error.message || "An unexpected error occurred"),
                debug: error.stack
            },
            { status: 500 }
        );
    }
}
