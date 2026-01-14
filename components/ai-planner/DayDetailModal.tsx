'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, Clock, MapPin, Utensils, Camera, ShoppingBag, Bed, ArrowLeft } from 'lucide-react';

interface ScheduleItem {
    time: string;
    activity: string;
}

interface DayDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    dayNumber: number;
    locationName: string;
}

export default function DayDetailModal({
    isOpen,
    onClose,
    dayNumber,
    locationName,
}: DayDetailModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [dayTitle, setDayTitle] = useState('');
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch detailed plan when modal opens
    useEffect(() => {
        if (isOpen && locationName) {
            fetchDayDetail();
        }
        // Reset state when closing
        if (!isOpen) {
            setSchedule([]);
            setDayTitle('');
            setError(null);
        }
    }, [isOpen, locationName, dayNumber]);

    const fetchDayDetail = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const prompt = `Detailed hour-by-hour plan for ${locationName} on Day ${dayNumber}. Include breakfast, sightseeing, lunch, activities, and dinner.`;

            const res = await fetch('/api/plan-trip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userQuery: prompt }),
            });

            const data = await res.json();

            if (data.type === 'day_detail' && data.schedule) {
                setDayTitle(data.day_title || `Day ${dayNumber}: ${locationName}`);
                setSchedule(data.schedule);
            } else {
                // If the API didn't return day_detail, show a fallback message
                setError('Could not generate a detailed plan. Please try again.');
            }
        } catch (err) {
            console.error('Day Detail Error:', err);
            setError('Failed to fetch day details. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Get icon based on activity text
    const getActivityIcon = (activity: string) => {
        const lower = activity.toLowerCase();
        if (lower.includes('breakfast') || lower.includes('lunch') || lower.includes('dinner') || lower.includes('food') || lower.includes('eat')) {
            return Utensils;
        }
        if (lower.includes('visit') || lower.includes('explore') || lower.includes('view') || lower.includes('photo')) {
            return Camera;
        }
        if (lower.includes('shop') || lower.includes('market') || lower.includes('bazaar')) {
            return ShoppingBag;
        }
        if (lower.includes('rest') || lower.includes('hotel') || lower.includes('sleep') || lower.includes('check')) {
            return Bed;
        }
        return MapPin;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Full Screen Overlay */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-50 bg-background overflow-y-auto"
                    >
                        {/* Sticky Header */}
                        <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border z-10">
                            <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
                                {/* Back Button */}
                                <button
                                    onClick={onClose}
                                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    <span className="font-medium">Back to Itinerary</span>
                                </button>

                                {/* Spacer */}
                                <div className="flex-1" />

                                {/* Day Title (Center) */}
                                <div className="absolute left-1/2 -translate-x-1/2 text-center">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Day {dayNumber}</p>
                                    <h2 className="text-lg font-semibold text-foreground">{locationName}</h2>
                                </div>

                                {/* Close Button (Right) */}
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-accent transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="max-w-3xl mx-auto px-4 py-8">
                            {/* Loading State */}
                            {isLoading && (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                                        <Clock className="w-4 h-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                    <p className="mt-4 text-muted-foreground text-sm">Planning your day...</p>
                                </div>
                            )}

                            {/* Error State */}
                            {error && !isLoading && (
                                <div className="text-center py-10">
                                    <p className="text-red-500 mb-4">{error}</p>
                                    <button
                                        onClick={fetchDayDetail}
                                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}

                            {/* Schedule Timeline */}
                            {!isLoading && !error && schedule.length > 0 && (
                                <div className="space-y-0">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-foreground mb-8">{dayTitle}</h3>

                                    {/* Timeline Items */}
                                    <div className="relative pl-8">
                                        {/* Vertical Line */}
                                        <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-border" />

                                        {schedule.map((item, index) => {
                                            const ActivityIcon = getActivityIcon(item.activity);
                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.08 }}
                                                    className="relative pb-8 last:pb-0"
                                                >
                                                    {/* Timeline Dot */}
                                                    <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-primary/10 
                                          flex items-center justify-center border-2 border-primary/30">
                                                        <ActivityIcon className="w-3 h-3 text-primary" />
                                                    </div>

                                                    {/* Content Card */}
                                                    <div className="bg-card rounded-xl border border-border/50 p-4 shadow-sm hover:shadow-md transition-shadow">
                                                        <p className="text-sm font-semibold text-primary mb-1">{item.time}</p>
                                                        <p className="text-foreground leading-relaxed">{item.activity}</p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
