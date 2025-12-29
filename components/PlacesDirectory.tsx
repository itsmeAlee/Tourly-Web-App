'use client';
import { useState, useMemo } from 'react';
import { Place } from '@/types';
import PlaceCard from '@/components/PlaceCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function PlacesDirectory({ places }: { places: Place[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [activityFilter, setActivityFilter] = useState('all');

  // Extract unique activities
  const allActivities = useMemo(() => {
    const activities = new Set<string>();
    places.forEach(place => {
      place.activities?.forEach(activity => activities.add(activity));
    });
    return Array.from(activities).sort();
  }, [places]);

  const filteredAndSortedPlaces = useMemo(() => {
    let filtered = places.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           place.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesActivity = activityFilter === 'all' || 
                             place.activities?.includes(activityFilter);

      return matchesSearch && matchesActivity;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

    return filtered;
  }, [places, searchQuery, sortBy, activityFilter]);

  return (
    <>
      {/* Search and Filter Bar */}
      <div className="bg-card rounded-lg border p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search destinations by name, location, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <Select value={activityFilter} onValueChange={setActivityFilter}>
              <SelectTrigger className="w-[160px] h-11 border-gray-200">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                {allActivities.map(activity => (
                  <SelectItem key={activity} value={activity}>{activity}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] h-11">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="location">Location (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-3 text-sm text-muted-foreground">
          Showing {filteredAndSortedPlaces.length} of {places.length} destinations
        </div>
      </div>

      {/* Places Grid */}
      {filteredAndSortedPlaces.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No destinations found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedPlaces.map((place) => (
            <PlaceCard key={place.$id} place={place} />
          ))}
        </div>
      )}
    </>
  );
}
