'use client';

import { motion } from 'motion/react';
import { MapPin, Sparkles, Bed, CalendarClock } from 'lucide-react';
import Link from 'next/link';

interface PlaceCardProps {
    stepOrder: number;
    locationName: string;
    summary: string;
    hotelQuery?: string;
    onPlanDay?: () => void;
}

export default function PlaceCard({
    stepOrder,
    locationName,
    summary,
    hotelQuery,
    onPlanDay,
}: PlaceCardProps) {
    // Use hotel_query if provided, otherwise fallback to location name
    const searchQuery = hotelQuery || locationName;
    const hotelsSearchUrl = `/hotels?query=${encodeURIComponent(searchQuery)}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: stepOrder * 0.1 }}
            className="relative z-10 w-full max-w-lg mx-auto"
        >
            {/* Blue Dot Indicator - Top Left */}
            <div className="absolute -top-2 -left-2 z-20">
                <div className="w-4 h-4 rounded-full bg-primary shadow-md border-2 border-background" />
            </div>

            {/* The White Card */}
            <div className="bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden
                      hover:shadow-md transition-shadow duration-300 relative bg-background">

                {/* Card Header with Day Label and Hotel Action */}
                <div className="flex items-center justify-between px-5 py-3 bg-accent/30 border-b border-border/30">
                    {/* Day Badge */}
                    <div className="flex items-center gap-2">
                        <CalendarClock className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-primary text-sm">Day {stepOrder}</span>
                    </div>

                    {/* Search Hotels Button - Opens in New Tab */}
                    <Link
                        href={hotelsSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground 
                       hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-accent"
                    >
                        <Bed className="w-4 h-4" />
                        <span className="hidden sm:inline">Hotels</span>
                    </Link>
                </div>

                {/* Card Content */}
                <div className="p-5">
                    {/* Location Name */}
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-primary shrink-0" />
                        <h3 className="font-semibold text-foreground text-lg leading-tight">
                            {locationName}
                        </h3>
                    </div>

                    {/* Summary */}
                    <div className="flex items-start gap-2.5 mb-4">
                        <Sparkles className="w-4 h-4 text-primary/40 mt-1 shrink-0" />
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {summary}
                        </p>
                    </div>

                    {/* Plan This Day Button */}
                    <button
                        onClick={onPlanDay}
                        className="w-full py-2.5 px-4 rounded-lg border border-primary/30 bg-primary/5
                       text-primary font-medium text-sm
                       hover:bg-primary hover:text-primary-foreground
                       transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <CalendarClock className="w-4 h-4" />
                        Plan This Day
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
