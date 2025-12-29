'use client';
import { useState, useMemo } from 'react';
import { Guide } from '@/types';
import GuideCard from '@/components/GuideCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Languages } from 'lucide-react';

export default function GuidesDirectory({ guides }: { guides: Guide[] }) {
  const [languageFilter, setLanguageFilter] = useState('all');

  // Extract unique languages
  const allLanguages = useMemo(() => {
    const languages = new Set<string>();
    guides.forEach(guide => {
      guide.languages?.forEach(lang => languages.add(lang));
    });
    return Array.from(languages).sort();
  }, [guides]);

  const filteredGuides = useMemo(() => {
    let filtered = guides;

    // Filter by language
    if (languageFilter !== 'all') {
      filtered = filtered.filter(guide => guide.languages?.includes(languageFilter));
    }

    // Sort by rating (highest first)
    filtered.sort((a, b) => b.rating - a.rating);

    return filtered;
  }, [guides, languageFilter]);

  return (
    <>
      {/* Filter Bar */}
      <div className="bg-card rounded-xl p-4 mb-8" style={{boxShadow: 'var(--shadow-floating-md)'}}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredGuides.length} of {guides.length} guides
          </div>

          {/* Language Filter */}
          <Select value={languageFilter} onValueChange={setLanguageFilter}>
            <SelectTrigger className="w-[180px] h-11">
              <Languages className="w-4 h-4 mr-2 text-primary" />
              <SelectValue placeholder="Filter by Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {allLanguages.map(language => (
                <SelectItem key={language} value={language}>{language}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Guides Grid */}
      {filteredGuides.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No guides found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.$id} guide={guide} />
          ))}
        </div>
      )}
    </>
  );
}
