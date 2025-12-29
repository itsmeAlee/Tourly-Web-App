'use client';
import { Guide } from "@/types";
import { Star, Languages, Phone, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GuideDetail({ guide }: { guide: Guide }) {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Image */}
        <div className="rounded-lg overflow-hidden border">
          <img 
            src={guide.imageUrl || 'https://placehold.co/600x600?text=Guide'} 
            alt={guide.name} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-accent rounded-lg border">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="font-bold text-foreground">{guide.rating}</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-foreground">
            {guide.name}
          </h1>

          <div className="space-y-4 mb-6">
            {guide.languages && guide.languages.length > 0 && (
              <div className="flex items-start gap-3">
                <Languages className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Languages</div>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages.map((lang) => (
                      <span 
                        key={lang} 
                        className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-lg"
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
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Contact</div>
                  <a 
                    href={`tel:${guide.contact}`}
                    className="text-foreground font-medium hover:text-primary"
                  >
                    {guide.contact}
                  </a>
                </div>
              </div>
            )}
          </div>

          <Button 
            className="w-full h-12 text-base font-medium rounded-lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            Contact Guide
          </Button>
        </div>
      </div>

      <div className="h-px bg-border mb-8" />

      {/* Bio Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">About</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">{guide.bio}</p>
      </div>
    </div>
  );
}
