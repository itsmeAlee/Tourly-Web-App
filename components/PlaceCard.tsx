'use client';
import { Place } from '@/types';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function PlaceCard({ place }: { place: Place }) {
    return (
        <Link href={`/places/${place.$id}`}>
            <Card className="overflow-hidden border border-gray-200 rounded-xl transition-all duration-300 h-full group hover:border-[#2D5F5D] hover:shadow-sm p-0">
                <CardContent className="p-0">
                    <div className="relative h-56 overflow-hidden">
                        <img
                            alt={place.name}
                            src={place.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                            <Star className="w-4 h-4 fill-[#2D5F5D] text-[#2D5F5D]" />
                            <span className="font-semibold text-gray-900 text-sm">{place.rating || 4.8}</span>
                        </div>
                    </div>
                    
                    <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#2D5F5D] transition-colors">
                            {place.name}
                        </h3>
                        
                        <div className="flex items-center text-gray-600 mb-3 text-sm">
                            <MapPin className="mr-1.5 text-gray-400 w-4 h-4" />
                            {place.location}
                        </div>

                        <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                            {place.description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

