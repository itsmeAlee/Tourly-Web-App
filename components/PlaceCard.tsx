'use client';
import { Place } from '@/types';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function PlaceCard({ place }: { place: Place }) {
    return (
        <Link href={`/places/${place.$id}`}>
            <Card className="overflow-hidden border-0 rounded-3xl transition-all duration-500 h-full group shadow-md hover:shadow-2xl">
                <div className="relative h-72 overflow-hidden">
                    <img
                        alt={place.name}
                        src={place.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm">
                        <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                        <span className="font-bold text-gray-800">{place.rating || 4.8}</span>
                    </div>
                </div>
                
                <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-1 group-hover:text-teal-700 transition-colors">
                        {place.name}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-4 text-sm font-medium">
                        <MapPin className="mr-2 text-teal-600 w-4 h-4" />
                        {place.location}
                    </div>

                    <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                        {place.description}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}

