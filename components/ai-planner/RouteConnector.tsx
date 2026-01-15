'use client';

import { useState } from 'react';
import { Car, Plane, Navigation } from 'lucide-react';

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
    const [showInfo, setShowInfo] = useState(false);

    // Determine if it's a flight
    const isAir = mode.toLowerCase().includes('flight') || mode.toLowerCase().includes('air');

    // Get the appropriate icon
    const getModeIcon = () => {
        const lower = mode.toLowerCase();
        if (lower.includes('flight') || lower.includes('air') || lower.includes('plane')) {
            return Plane;
        }
        if (lower.includes('car') || lower.includes('drive') || lower.includes('road')) {
            return Car;
        }
        return Navigation;
    };

    const ModeIcon = getModeIcon();

    // SVG Path: A gentle S-curve from top-center to bottom-center
    // The viewBox is 100x120 to give more vertical space for the curve
    const curvePath = "M 50 0 C 50 30, 20 50, 50 60 C 80 70, 50 90, 50 120";

    return (
        <div
            className="relative w-full flex items-center justify-center"
            style={{ height: '120px', zIndex: 5 }}
        >
            {/* The Interactive SVG Layer */}
            <svg
                viewBox="0 0 100 120"
                preserveAspectRatio="xMidYMid meet"
                className="w-24 h-full overflow-visible"
                style={{ maxWidth: '100px' }}
            >
                {/* Invisible Shadow Path for easier clicking */}
                <path
                    d={curvePath}
                    stroke="transparent"
                    strokeWidth="24"
                    fill="none"
                    className="cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                    onClick={() => setShowInfo(!showInfo)}
                />

                {/* Visible Path (The Curved Line) */}
                <path
                    d={curvePath}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray={isAir ? '6,4' : '0'}
                    strokeLinecap="round"
                    style={{ pointerEvents: 'none' }}
                />

                {/* Start Dot */}
                <circle cx="50" cy="0" r="4" fill="hsl(var(--primary))" />

                {/* End Arrow/Dot */}
                <circle cx="50" cy="120" r="4" fill="hsl(var(--primary))" />

                {/* Small chevron arrow at the end */}
                <path
                    d="M 45 112 L 50 118 L 55 112"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {/* The Info Popover */}
            {showInfo && (
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                               bg-popover text-popover-foreground shadow-xl rounded-xl border border-border
                               px-4 py-3 min-w-[140px] z-50"
                    style={{ pointerEvents: 'auto' }}
                >
                    {/* Close Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowInfo(false);
                        }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-background rounded-full border border-border 
                                   flex items-center justify-center hover:bg-accent transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>

                    {/* Mode Header */}
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <ModeIcon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm font-semibold capitalize">{mode}</span>
                    </div>

                    {/* Stats */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">Distance</span>
                            <span className="font-medium text-foreground">{distance}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">Duration</span>
                            <span className="font-medium text-foreground">{duration}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Click hint - only show when popup is closed */}
            {!showInfo && (
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                               text-[10px] text-muted-foreground/60 pointer-events-none
                               bg-background/80 px-2 py-0.5 rounded-full border border-border/30"
                >
                    {distance}
                </div>
            )}
        </div>
    );
}
