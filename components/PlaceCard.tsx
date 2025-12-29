'use client';
import { Place } from '@/types';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function PlaceCard({ place }: { place: Place }) {
    return (
        <Link href={`/places/${place.$id}`}>
            <Card className="overflow-hidden rounded-lg transition-colors h-full group p-0">
                <CardContent className="p-0">
                    <div className="relative h-56 overflow-hidden bg-muted">
                        <img
                            alt={place.name}
                            src={place.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 bg-card px-3 py-1.5 rounded-lg flex items-center gap-1.5 border">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span className="font-semibold text-foreground text-sm">{place.rating || 4.8}</span>
                        </div>
                    </div>
                    
                    <div className="p-5">
                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                            {place.name}
                        </h3>
                        
                        <div className="flex items-center text-muted-foreground mb-3 text-sm">
                            <MapPin className="mr-1.5 text-primary w-4 h-4" />
                            {place.location}
                        </div>

                        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                            {place.description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

