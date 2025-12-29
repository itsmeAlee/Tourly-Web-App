'use client';
import { Guide } from "@/types";
import { Star, Languages, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GuideDetail({ guide }: { guide: Guide }) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
          <img 
            src={guide.imageUrl || 'https://placehold.co/600x600?text=Guide'} 
            alt={guide.name} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
              <Star className="w-5 h-5 fill-[#2D5F5D] text-[#2D5F5D]" />
              <span className="font-bold text-gray-900">{guide.rating}</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {guide.name}
          </h1>

          <div className="space-y-4 mb-6">
            {guide.languages && guide.languages.length > 0 && (
              <div className="flex items-start gap-3">
                <Languages className="w-5 h-5 text-[#2D5F5D] mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Languages</div>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages.map((lang) => (
                      <span 
                        key={lang} 
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {guide.contact && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#2D5F5D]" />
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Contact</div>
                  <a 
                    href={`tel:${guide.contact}`}
                    className="text-gray-900 font-medium hover:text-[#2D5F5D]"
                  >
                    {guide.contact}
                  </a>
                </div>
              </div>
            )}
          </div>

          <Button 
            className="w-full h-12 text-base font-medium rounded-lg bg-[#2D5F5D] hover:bg-[#234745] text-white"
          >
            <Phone className="w-5 h-5 mr-2" />
            Contact Guide
          </Button>
        </div>
      </div>

      <div className="h-px bg-gray-200 mb-8" />

      {/* Bio Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">About</h2>
        <p className="text-gray-600 text-lg leading-relaxed">{guide.bio}</p>
      </div>
    </div>
  );
}
