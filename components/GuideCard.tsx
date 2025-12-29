import Link from 'next/link';
import { Guide } from '@/types';
import { Star, Languages, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link href={`/guides/${guide.$id}`}>
      <Card className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#2D5F5D] hover:shadow-sm transition-all duration-300 group">
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative h-56 bg-gray-100 overflow-hidden">
            <img 
              src={guide.imageUrl || 'https://placehold.co/400x300?text=Guide'} 
              alt={guide.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Rating Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm">
              <Star className="w-4 h-4 fill-[#2D5F5D] text-[#2D5F5D]" />
              <span className="text-sm font-semibold text-gray-900">{guide.rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#2D5F5D] transition-colors">
              {guide.name}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {guide.bio}
            </p>
            
            <div className="flex items-center gap-4 text-sm">
              {guide.languages && guide.languages.length > 0 && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Languages className="w-4 h-4" />
                  <span>{guide.languages.slice(0, 2).join(', ')}</span>
                </div>
              )}
              
              {guide.contact && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs">{guide.contact}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
