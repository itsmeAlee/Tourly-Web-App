'use client';
import { Hotel } from '@/types';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function HotelCard({ hotel }: { hotel: Hotel }) {
    return (
        <Link href={`/hotels/${hotel.$id}`}>
            <Card className="overflow-hidden border-0 rounded-3xl transition-all duration-500 h-full group shadow-md hover:shadow-2xl">
                <div className="relative h-72 overflow-hidden">
                    <img
                        alt={hotel.name}
                        src={hotel.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 glass-card px-4 py-2 rounded-2xl shadow-lg backdrop-blur-md">
                        <div className="text-lg font-black text-teal-700">
                            PKR {hotel.pricePerNight.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600 font-semibold">per night</div>
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                        <span className="font-bold text-gray-800">{hotel.rating || 4.5}</span>
                        <span className="text-xs text-gray-500">Excellent</span>
                    </div>
                </div>
                
                <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-1 group-hover:text-teal-700 transition-colors">
                        {hotel.name}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-4 text-sm font-medium">
                        <MapPin className="mr-2 text-teal-600 w-4 h-4" />
                        {hotel.location}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {hotel.amenities?.slice(0, 3).map(amenity => (
                            <span 
                                key={amenity} 
                                className="border-0 rounded-full px-4 py-1 text-sm font-semibold bg-gradient-to-r from-cyan-50 to-teal-50 text-teal-700"
                            >
                                {amenity}
                            </span>
                        ))}
                        {hotel.amenities?.length > 3 && (
                            <span className="text-sm text-gray-500 font-semibold self-center">+{hotel.amenities.length - 3} more</span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

