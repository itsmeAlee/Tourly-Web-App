'use client';
import { Place } from "@/types";
import { MapPin, Activity, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PlaceDetail({ place }: { place: Place }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = place.images?.length ? place.images : ["https://placehold.co/800x400?text=No+Image"];
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto pt-24 pb-16 px-4">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Image Carousel */}
      <div className="relative mb-8 rounded-lg overflow-hidden border">
        <Image 
          src={images[currentImage]} 
          alt={place.name}
          width={800}
          height={400}
          className="w-full h-96 object-cover"
          priority={currentImage === 0}
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
        <h1 className="text-4xl font-bold mb-3 text-foreground">
          {place.name}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground text-lg">
          <MapPin className="w-5 h-5 text-primary" />
          <span>{place.location}</span>
        </div>
      </div>

      <div className="h-px bg-border mb-8" />

      {/* About Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">{place.description}</p>
      </div>

      {/* Activities Section */}
      {place.activities?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Activities
          </h2>
          <div className="flex gap-2 flex-wrap">
            {place.activities.map(activity => (
              <span 
                key={activity} 
                className="px-4 py-2 rounded-full bg-accent text-accent-foreground font-semibold text-sm"
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
