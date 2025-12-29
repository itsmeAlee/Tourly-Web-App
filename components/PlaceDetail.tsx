'use client';
import { Place } from "@/types";
import { MapPin, Activity } from "lucide-react";
import { useState } from "react";

export default function PlaceDetail({ place }: { place: Place }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = place.images?.length ? place.images : ["https://placehold.co/800x400?text=No+Image"];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Image Carousel */}
      <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src={images[currentImage]} 
          alt={place.name} 
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
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-teal-700 to-orange-500 bg-clip-text text-transparent">
          {place.name}
        </h1>
        <div className="flex items-center gap-2 text-gray-600 text-lg">
          <MapPin className="w-5 h-5" />
          <span>{place.location}</span>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8" />

      {/* About Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">About</h2>
        <p className="text-gray-600 text-lg leading-relaxed">{place.description}</p>
      </div>

      {/* Activities Section */}
      {place.activities?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <Activity className="w-6 h-6 text-teal-600" />
            Activities
          </h2>
          <div className="flex gap-2 flex-wrap">
            {place.activities.map(activity => (
              <span 
                key={activity} 
                className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-shadow"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
