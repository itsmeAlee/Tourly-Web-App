'use client';
import Link from 'next/link';
import { Building2, MapPin, Users, Calendar, ArrowRight } from 'lucide-react';

export default function Categories() {
    const categories = [
        {
            href: '/hotels',
            icon: Building2,
            title: 'Hotels',
            description: 'Find your perfect mountain retreat',
        },
        {
            href: '/places',
            icon: MapPin,
            title: 'Destinations',
            description: 'Discover stunning locations',
        },
        {
            href: '/guides',
            icon: Users,
            title: 'Tour Guides',
            description: 'Connect with local experts',
        },
        {
            href: '/ai-planner',
            icon: Calendar,
            title: 'Plan Trip',
            description: 'Create custom itineraries',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto py-20 px-4 bg-accent/30">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-3 text-foreground tracking-tight">
                    Explore & Experience
                </h2>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                    Everything you need to plan your perfect Gilgit-Baltistan journey
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <Link key={index} href={category.href} className="group">
                        <div className="bg-card rounded-lg border p-6 hover:border-primary transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-accent group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                                <category.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                                {category.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                {category.description}
                            </p>
                            <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>Explore</span>
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
