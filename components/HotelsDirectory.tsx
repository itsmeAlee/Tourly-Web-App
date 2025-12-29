'use client';
import { useState, useMemo } from 'react';
import { Hotel } from '@/types';
import HotelCard from '@/components/HotelCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function HotelsDirectory({ hotels }: { hotels: Hotel[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [priceRange, setPriceRange] = useState('all');

  const filteredAndSortedHotels = useMemo(() => {
    let filtered = hotels.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesPrice = true;
      if (priceRange !== 'all') {
        const price = hotel.pricePerNight;
        switch (priceRange) {
          case 'budget':
            matchesPrice = price < 5000;
            break;
          case 'mid':
            matchesPrice = price >= 5000 && price < 15000;
            break;
          case 'luxury':
            matchesPrice = price >= 15000;
            break;
        }
      }

      return matchesSearch && matchesPrice;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.pricePerNight - b.pricePerNight;
        case 'price-high':
          return b.pricePerNight - a.pricePerNight;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [hotels, searchQuery, sortBy, priceRange]);

  return (
    <>
      {/* Search and Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search hotels by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 border-gray-200 focus:border-[#2D5F5D] focus:ring-1 focus:ring-[#2D5F5D]"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-[160px] h-11 border-gray-200">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (&lt; PKR 5k)</SelectItem>
                <SelectItem value="mid">Mid (PKR 5k-15k)</SelectItem>
                <SelectItem value="luxury">Luxury (PKR 15k+)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] h-11 border-gray-200">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-3 text-sm text-gray-600">
          Showing {filteredAndSortedHotels.length} of {hotels.length} hotels
        </div>
      </div>

      {/* Hotels Grid */}
      {filteredAndSortedHotels.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No hotels found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedHotels.map((hotel) => (
            <HotelCard key={hotel.$id} hotel={hotel} />
          ))}
        </div>
      )}
    </>
  );
}
