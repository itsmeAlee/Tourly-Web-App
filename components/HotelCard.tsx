'use client';
import { Hotel } from '@/types';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function HotelCard({ hotel }: { hotel: Hotel }) {
    return (
        <Link href={`/hotels/${hotel.$id}`}>
            <Card className="overflow-hidden rounded-xl transition-all duration-300 h-full group hover:translate-y-[-2px] p-0" style={{boxShadow: 'var(--shadow-floating-sm)'}}>
                <CardContent className="p-0">
                    <div className="relative h-56 overflow-hidden bg-muted">
                        <img
                            alt={hotel.name}
                            src={hotel.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Price Badge */}
                        <div className="absolute top-3 right-3 bg-card px-3 py-2 rounded-lg" style={{boxShadow: 'var(--shadow-floating-md)'}}>
                            <div className="text-base font-bold text-primary">
                                PKR {hotel.pricePerNight.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground font-medium">per night</div>
                        </div>
                        
                        {/* Rating Badge */}
                        <div className="absolute bottom-3 left-3 bg-card px-3 py-1.5 rounded-lg flex items-center gap-1.5" style={{boxShadow: 'var(--shadow-floating-sm)'}}>
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span className="font-semibold text-foreground text-sm">{hotel.rating || 4.5}</span>
                        </div>
                    </div>
                    
                    <div className="p-5">
                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                            {hotel.name}
                        </h3>
                        
                        <div className="flex items-center text-muted-foreground mb-3 text-sm">
                            <MapPin className="mr-1.5 text-primary w-4 h-4" />
                            {hotel.location}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {hotel.amenities?.slice(0, 3).map(amenity => (
                                <span 
                                    key={amenity} 
                                    className="rounded-full px-3 py-1 text-xs font-medium bg-accent text-accent-foreground"
                                >
                                    {amenity}
                                </span>
                            ))}
                            {hotel.amenities?.length > 3 && (
                                <span className="text-xs text-muted-foreground font-medium self-center">+{hotel.amenities.length - 3} more</span>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

