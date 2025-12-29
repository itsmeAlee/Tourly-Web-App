'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative min-h-[85vh] flex items-center justify-center bg-white">
            <div className="relative z-10 text-center px-4 max-w-6xl w-full page-transition py-20">
                <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50">
                    <span className="text-sm font-medium text-gray-600">Discover Pakistan's Northern Areas</span>
                </div>
                
                <h1 className="text-gray-900 text-6xl md:text-7xl mb-6 font-bold leading-tight tracking-tight">
                    Plan Your Perfect
                    <span className="block mt-2 text-[#2D5F5D]">
                        Mountain Escape
                    </span>
                </h1>
                
                <p className="text-lg mb-12 text-gray-600 max-w-2xl mx-auto">
                  Explore hotels, destinations, and experiences in Gilgit-Baltistan
                </p>
                
                {/* Search Widget */}
                <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-3 items-end max-w-4xl mx-auto">
                    <div className="flex-1 w-full text-left">
                        <label className="block text-xs font-medium text-gray-600 mb-2 ml-1">Destination</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input 
                                placeholder="Where are you going?" 
                                className="h-11 pl-10 text-sm border-gray-200 focus:border-[#2D5F5D] focus:ring-1 focus:ring-[#2D5F5D] rounded-lg"
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full text-left">
                        <label className="block text-xs font-medium text-gray-600 mb-2 ml-1">Check-in</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input 
                                type="date"
                                className="h-11 pl-10 text-sm border-gray-200 focus:border-[#2D5F5D] focus:ring-1 focus:ring-[#2D5F5D] rounded-lg"
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full text-left">
                        <label className="block text-xs font-medium text-gray-600 mb-2 ml-1">Guests</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input 
                                type="number"
                                placeholder="2"
                                defaultValue="2"
                                min="1"
                                className="h-11 pl-10 text-sm border-gray-200 focus:border-[#2D5F5D] focus:ring-1 focus:ring-[#2D5F5D] rounded-lg"
                            />
                        </div>
                    </div>
                    
                    <Button 
                        size="lg"
                        className="h-11 px-6 text-sm font-medium rounded-lg bg-[#2D5F5D] hover:bg-[#234745] text-white w-full md:w-auto"
                    >
                        <Search className="w-4 h-4 mr-2" />
                        Search
                    </Button>
                </div>
                
                {/* Quick Links */}
                <div className="mt-10 flex flex-wrap justify-center gap-2 items-center">
                    <span className="text-sm text-gray-500">Popular:</span>
                    {['Skardu', 'Hunza Valley', 'Fairy Meadows', 'Naran'].map(place => (
                        <button key={place} className="px-4 py-1.5 hover:bg-gray-50 text-sm text-gray-700 rounded-full border border-gray-200 transition-all">
                            {place}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

