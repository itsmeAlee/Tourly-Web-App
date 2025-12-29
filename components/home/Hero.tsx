'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative min-h-[85vh] flex items-center justify-center bg-background">
            <div className="relative z-10 text-center px-4 max-w-6xl w-full page-transition py-20">
                <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-accent/50">
                    <span className="text-sm font-medium text-muted-foreground">Discover Pakistan's Northern Areas</span>
                </div>
                
                <h1 className="text-foreground text-6xl md:text-7xl mb-6 font-bold leading-tight tracking-tight">
                    Plan Your Perfect
                    <span className="block mt-2 text-primary">
                        Mountain Escape
                    </span>
                </h1>
                
                <p className="text-lg mb-12 text-muted-foreground max-w-2xl mx-auto">
                  Explore hotels, destinations, and experiences in Gilgit-Baltistan
                </p>
                
                {/* Search Widget */}
                <div className="relative w-full">
                    {/* Gradient Background - Full Width */}
                    <div 
                        className="absolute left-0 right-0 h-full blur-3xl opacity-30"
                        style={{
                            background: 'radial-gradient(ellipse 800px 300px at center, oklch(0.71 0.15 239.15), transparent)'
                        }}
                    ></div>
                    
                    <div className="relative max-w-4xl mx-auto">
                        <div 
                            className="bg-card p-4 rounded-lg border flex flex-col md:flex-row gap-3 items-end"
                            style={{
                                borderColor: 'oklch(0.71 0.15 239.15)',
                                boxShadow: '0 0 20px rgba(88, 86, 214, 0.3), 0 0 40px rgba(88, 86, 214, 0.15)'
                            }}
                        >
                    <div className="flex-1 w-full text-left">
                        <label className="block text-xs font-medium text-muted-foreground mb-2 ml-1">Destination</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input 
                                placeholder="Where are you going?" 
                                className="h-11 pl-10 text-sm rounded-lg"
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full text-left">
                        <label className="block text-xs font-medium text-muted-foreground mb-2 ml-1">Check-in</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input 
                                type="date"
                                className="h-11 pl-10 text-sm rounded-lg"
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full text-left">
                        <label className="block text-xs font-medium text-muted-foreground mb-2 ml-1">Guests</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input 
                                type="number"
                                placeholder="2"
                                defaultValue="2"
                                min="1"
                                className="h-11 pl-10 text-sm rounded-lg"
                            />
                        </div>
                    </div>
                    
                    <Button 
                        size="lg"
                        className="h-11 px-6 text-sm font-medium rounded-lg w-full md:w-auto"
                    >
                        <Search className="w-4 h-4 mr-2" />
                        Search
                    </Button>
                    </div>
                    </div>
                </div>
                
                {/* Quick Links */}
                <div className="mt-10 flex flex-wrap justify-center gap-2 items-center">
                    <span className="text-sm text-muted-foreground">Popular:</span>
                    {['Skardu', 'Hunza Valley', 'Fairy Meadows', 'Naran'].map(place => (
                        <button key={place} className="px-4 py-1.5 hover:bg-accent text-sm text-foreground rounded-full border transition-all">
                            {place}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

