'use client';
import { Hotel } from "@/types";
import { MapPin, Star, Wifi, Coffee, Wind, Tv, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const amenityIcons: Record<string, any> = {
  'WiFi': Wifi,
  'Restaurant': Coffee,
  'Air Conditioning': Wind,
  'TV': Tv,
};

export default function HotelDetail({ hotel }: { hotel: Hotel }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = hotel.images?.length ? hotel.images : ["https://placehold.co/800x400?text=No+Image"];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Image Carousel */}
      <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src={images[currentImage]} 
          alt={hotel.name} 
          className="w-full h-96 object-cover" 
        />
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImage 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-teal-700 to-orange-500 bg-clip-text text-transparent">
            {hotel.name}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600 text-lg">
              <MapPin className="w-5 h-5" />
              <span>{hotel.location}</span>
            </div>
            <div className="flex items-center gap-1 text-orange-500">
              <Star className="w-5 h-5 fill-orange-500" />
              <span className="font-bold">{hotel.rating}</span>
            </div>
          </div>
        </div>
        <div className="text-right glass-card px-6 py-4 rounded-2xl">
          <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            PKR {hotel.pricePerNight}
          </div>
          <div className="text-gray-600 font-semibold">per night</div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8" />

      {/* About Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">About</h2>
        <p className="text-gray-600 text-lg leading-relaxed">{hotel.description}</p>
      </div>

      {/* Amenities Section */}
      {hotel.amenities?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Amenities</h2>
          <div className="flex gap-2 flex-wrap">
            {hotel.amenities.map(amenity => {
              const Icon = amenityIcons[amenity] || Coffee;
              return (
                <span 
                  key={amenity} 
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-shadow flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {amenity}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Book Button */}
      <Button 
        className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Book Now
      </Button>
    </div>
  );
}
