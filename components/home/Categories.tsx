'use client';
import Link from 'next/link';
import { Building2, MapPin, Compass, Calendar, ArrowRight } from 'lucide-react';

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
            href: '#',
            icon: Compass,
            title: 'Tours',
            description: 'Expert-guided adventures',
        },
        {
            href: '#',
            icon: Calendar,
            title: 'Plan Trip',
            description: 'Create custom itineraries',
        },
    ];

    return (
      <div className="max-w-7xl mx-auto py-20 px-4 bg-gray-50">
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 tracking-tight">
                Explore & Experience
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Everything you need to plan your perfect Gilgit-Baltistan journey
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
                <Link key={index} href={category.href} className="group">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#2D5F5D] hover:shadow-sm transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-gray-50 group-hover:bg-[#2D5F5D] flex items-center justify-center mb-4 transition-colors duration-300">
                            <category.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-[#2D5F5D] transition-colors">
                            {category.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            {category.description}
                        </p>
                        <div className="flex items-center text-sm font-medium text-[#2D5F5D] opacity-0 group-hover:opacity-100 transition-opacity">
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
