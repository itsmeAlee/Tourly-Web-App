'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Loader2, MapPin, ArrowLeft, RotateCcw, AlertCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

import PlaceCard from '@/components/ai-planner/TimelineItem';
import TripConnector from '@/components/ai-planner/RouteConnector';
import DayDetailModal from '@/components/ai-planner/DayDetailModal';

const SESSION_STORAGE_KEY = 'currentTripPlan';

interface TimelineStep {
    step_order: number;
    location_name: string;
    hotel_query?: string;
    card_details: {
        summary: string;
        image_keyword: string;
    };
    travel_to_next: {
        has_next: boolean;
        distance?: string;
        duration?: string;
        mode?: string;
        polyline_type?: 'road' | 'air';
    };
}

interface ApiResponse {
    type: 'itinerary' | 'clarification' | 'irrelevant' | 'error' | 'day_detail';
    message?: string;
    timeline?: TimelineStep[];
    day_title?: string;
    schedule?: Array<{ time: string; activity: string }>;
}

interface SelectedDay {
    dayNumber: number;
    locationName: string;
}

export default function AIPlannerPage() {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Task 4: Load from session storage on mount
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed && parsed.type === 'itinerary' && parsed.timeline) {
                    setResponse(parsed);
                }
            }
        } catch (err) {
            console.error('Failed to load plan from session storage:', err);
        }
    }, []);

    // Task 4: Save to session storage when response updates
    useEffect(() => {
        if (response && response.type === 'itinerary' && response.timeline) {
            try {
                sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(response));
            } catch (err) {
                console.error('Failed to save plan to session storage:', err);
            }
        }
    }, [response]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setResponse(null);

        try {
            const res = await fetch('/api/plan-trip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userQuery: query }),
            });
            const data = await res.json();
            setResponse(data);
        } catch (err) {
            console.error(err);
            setResponse({ type: 'error', message: 'Something went wrong.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setQuery('');
        setResponse(null);
        setSelectedDay(null);
        // Clear session storage when resetting
        try {
            sessionStorage.removeItem(SESSION_STORAGE_KEY);
        } catch (err) {
            console.error('Failed to clear session storage:', err);
        }
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handlePlanDay = (dayNumber: number, locationName: string) => {
        setSelectedDay({ dayNumber, locationName });
    };

    const showItinerary = response?.type === 'itinerary' && response.timeline;
    const showFeedback = response && (response.type !== 'itinerary' && response.type !== 'day_detail');

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/40">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="hover:bg-accent p-2 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        <h1 className="font-semibold text-lg">AI Trip Planner</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">

                {/* Intro */}
                <AnimatePresence>
                    {!showItinerary && !isLoading && !response && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8"
                        >
                            <h2 className="text-3xl font-bold mb-3 tracking-tight">Design Your Perfect Trip</h2>
                            <p className="text-muted-foreground text-lg">Where to next?</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Input Bar */}
                <div className="sticky top-24 z-30 mb-12">
                    <form onSubmit={handleSubmit} className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <MapPin className="w-5 h-5 text-muted-foreground/70" />
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g. 5 days in Hunza starting from Islamabad..."
                            className="w-full bg-card border border-border shadow-lg shadow-black/5 rounded-2xl py-4 pl-12 pr-32 
                           text-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !query.trim()}
                            className="absolute right-2 top-2 bottom-2 bg-primary text-primary-foreground px-6 rounded-xl font-medium
                           disabled:opacity-50 hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            <span className="hidden sm:inline">{isLoading ? 'Thinking...' : 'Plan'}</span>
                        </button>
                    </form>
                </div>

                {/* --- STATE 1: FEEDBACK CARD --- */}
                <AnimatePresence mode="wait">
                    {showFeedback && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`p-6 rounded-2xl border mb-8 flex flex-col items-center text-center
                ${response!.type === 'clarification'
                                    ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-700/50 text-amber-900 dark:text-amber-100'
                                    : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-700/50 text-red-900 dark:text-red-100'}`}
                        >
                            {response!.type === 'clarification' ? (
                                <AlertTriangle className="w-10 h-10 text-amber-500 mb-3" />
                            ) : (
                                <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
                            )}
                            <p className="font-medium text-lg mb-1">
                                {response!.type === 'clarification' ? 'Clarification Needed' : 'Request Issue'}
                            </p>
                            <p className="opacity-90">{response!.message}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- STATE 2: VISUAL TIMELINE --- */}
                <AnimatePresence>
                    {showItinerary && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="flex flex-col items-center w-full"
                        >
                            {/* The List */}
                            <div className="w-full flex flex-col">
                                {response!.timeline?.map((step, index) => {
                                    const hasNext = step.travel_to_next?.has_next && step.travel_to_next?.distance;
                                    return (
                                        <div key={index} className="flex flex-col items-center w-full">
                                            {/* 1. The Card */}
                                            <PlaceCard
                                                stepOrder={step.step_order}
                                                locationName={step.location_name}
                                                summary={step.card_details.summary}
                                                hotelQuery={step.hotel_query}
                                                onPlanDay={() => handlePlanDay(step.step_order, step.location_name)}
                                            />

                                            {/* 2. The Connector (if valid) */}
                                            {hasNext && (
                                                <TripConnector
                                                    distance={step.travel_to_next.distance || ''}
                                                    duration={step.travel_to_next.duration || ''}
                                                    mode={step.travel_to_next.mode || ''}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Reset Action */}
                            <motion.button
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                                onClick={handleReset}
                                className="mt-12 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span>Start New Plan</span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>

            {/* Day Detail Modal (Full Screen Overlay) */}
            <DayDetailModal
                isOpen={selectedDay !== null}
                onClose={() => setSelectedDay(null)}
                dayNumber={selectedDay?.dayNumber || 1}
                locationName={selectedDay?.locationName || ''}
            />
        </div>
    );
}
