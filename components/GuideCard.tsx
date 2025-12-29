import Link from 'next/link';
import Image from 'next/image';
import { Guide } from '@/types';
import { Star, Languages } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function GuideCard({ guide }: { guide: Guide }) {
  // Parse imageUrl if it's a JSON array string
  let imageUrl = guide.imageUrl;
  if (imageUrl && typeof imageUrl === 'string') {
    try {
      const parsed = JSON.parse(imageUrl);
      if (Array.isArray(parsed) && parsed.length > 0) {
        imageUrl = parsed[0];
      }
    } catch (e) {
      // If parsing fails, use the original string
    }
  }

  // Format phone number for WhatsApp (remove spaces, dashes, etc.)
  const whatsappNumber = guide.contact?.replace(/[^0-9+]/g, '');

  return (
    <Card className="rounded-lg transition-colors group p-0">
      <CardContent className="p-6">
        <Link href={`/guides/${guide.$id}`} className="block">
          <div className="flex gap-4 mb-4">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-muted border-2 border-border">
                <Image 
                  src={imageUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(guide.name) + '&size=120&background=2D5F5D&color=fff'} 
                  alt={guide.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name and Rating */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors truncate">
                {guide.name}
              </h3>
              
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-semibold text-foreground">{guide.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">Rating</span>
              </div>

              {/* Languages */}
              {guide.languages && guide.languages.length > 0 && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Languages className="w-4 h-4" />
                  <span className="truncate">{guide.languages.slice(0, 2).join(', ')}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Bio */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {guide.bio}
          </p>
        </Link>
        
        {/* WhatsApp Button */}
        {guide.contact && whatsappNumber && (
          <a 
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <Button 
              className="w-full h-10 text-sm font-medium bg-[#25D366] hover:bg-[#20BA5A] text-white"
            >
              <WhatsAppIcon className="w-4 h-4 mr-2" />
              Contact on WhatsApp
            </Button>
          </a>
        )}
      </CardContent>
    </Card>
  );
}
