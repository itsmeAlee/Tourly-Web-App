import { getHotels } from "@/lib/db/hotels";
import HotelCard from "@/components/HotelCard";

export const revalidate = 60; // ISR

export default async function HotelsPage() {
  const hotels = await getHotels();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #f8fafb 0%, #ffffff 100%)' }}>
      <div className="max-w-7xl mx-auto py-20 px-4 page-transition">
        {/* Header Section */}
        <div className="text-center mb-16 mt-12">
          <h1 className="text-6xl md:text-7xl font-black mb-4" style={{ letterSpacing: '-2px' }}>
            Stay at the best
            <span className="block mt-2 bg-gradient-to-r from-teal-700 to-orange-500 bg-clip-text text-transparent">
              hotels
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover handpicked accommodations with breathtaking mountain views and exceptional hospitality
          </p>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.$id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}
