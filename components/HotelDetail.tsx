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
      <div className="relative mb-8 rounded-lg overflow-hidden border">
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
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            {hotel.name}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-lg">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{hotel.location}</span>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <Star className="w-5 h-5 fill-primary" />
              <span className="font-bold">{hotel.rating}</span>
            </div>
          </div>
        </div>
        <div className="text-right bg-card px-6 py-4 rounded-lg border">
          <div className="text-3xl font-bold text-primary">
            PKR {hotel.pricePerNight}
          </div>
          <div className="text-muted-foreground font-semibold">per night</div>
        </div>
      </div>

      <div className="h-px bg-border mb-8" />

      {/* About Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">{hotel.description}</p>
      </div>

      {/* Amenities Section */}
      {hotel.amenities?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Amenities</h2>
          <div className="flex gap-2 flex-wrap">
            {hotel.amenities.map(amenity => {
              const Icon = amenityIcons[amenity] || Coffee;
              return (
                <span 
                  key={amenity} 
                  className="px-4 py-2 rounded-full bg-accent text-accent-foreground font-semibold text-sm flex items-center gap-2"
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
        className="w-full h-14 text-lg font-bold rounded-xl"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Book Now
      </Button>
    </div>
  );
}
