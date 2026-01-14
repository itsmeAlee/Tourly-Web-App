'use client';

import { useState } from 'react';

interface TripConnectorProps {
    distance: string;
    duration: string;
    mode: string;
}

export default function TripConnector({
    distance,
    duration,
    mode,
}: TripConnectorProps) {
    // State for the Popover/Tooltip
    const [showInfo, setShowInfo] = useState(false);

    // 1. Define the Path Command (The Mathematical Curve)
    // M 50 0   -> Move to Top Center (Start)
    // C 50 40  -> Control Point 1 (Pull down vertically first)
    //   50 60  -> Control Point 2 (Continue vertically)
    //   50 100 -> End at Bottom Center
    const verticalPath = "M 50 0 C 50 40, 50 60, 50 100";

    return (
        <div style={{ position: 'relative', height: '80px', width: '100%', zIndex: 0 }}>

            {/* The Interactive SVG Layer */}
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none" // Stretch to fill the gap
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
                {/* Shadow Path (Thicker, Invisible, makes clicking easier) */}
                <path
                    d={verticalPath}
                    stroke="transparent"
                    strokeWidth="20"
                    fill="none"
                    style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                    onClick={() => setShowInfo(!showInfo)}
                />

                {/* Visible Path (The actual Blue Curve) */}
                <path
                    d={verticalPath}
                    stroke="hsl(var(--primary))" // Theme Blue
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={mode.toLowerCase().includes('flight') || mode.toLowerCase().includes('air') ? '5,5' : '0'}
                    style={{ pointerEvents: 'none' }} // Let clicks pass through to the shadow path
                />

                {/* Start dot */}
                <circle cx="50" cy="0" r="2" fill="hsl(var(--primary))" />
                {/* End dot */}
                <circle cx="50" cy="100" r="2" fill="hsl(var(--primary))" />
            </svg>

            {/* The Popover Logic */}
            {showInfo && (
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-popover text-popover-foreground shadow-xl p-3 rounded-lg border border-border z-50 min-w-[120px]"
                >
                    <button
                        onClick={() => setShowInfo(false)}
                        className="absolute -top-2 -right-2 bg-background rounded-full border border-border p-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                    <p className="text-xs font-bold flex items-center gap-1">
                        <span className="capitalize">{mode}</span>
                    </p>
                    <div className="flex flex-col gap-0.5 mt-1">
                        <p className="text-xs text-muted-foreground">Dist: <span className="text-foreground font-medium">{distance}</span></p>
                        <p className="text-xs text-muted-foreground">Time: <span className="text-foreground font-medium">{duration}</span></p>
                    </div>
                </div>
            )}
        </div>
    );
}
