import { getPlaces } from "@/lib/db/places";
import PlaceCard from "@/components/PlaceCard";

export const revalidate = 60; // ISR

export default async function PlacesPage() {
  const places = await getPlaces();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #f8fafb 0%, #ffffff 100%)' }}>
      <div className="max-w-7xl mx-auto py-20 px-4 page-transition">
        {/* Header Section */}
        <div className="text-center mb-16 mt-12">
          <h1 className="text-6xl md:text-7xl font-black mb-4" style={{ letterSpacing: '-2px' }}>
            Explore hidden
            <span className="block mt-2 bg-gradient-to-r from-teal-700 to-orange-500 bg-clip-text text-transparent">
              gems
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover stunning destinations, pristine lakes, and majestic peaks across Gilgit-Baltistan
          </p>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((place) => (
            <PlaceCard key={place.$id} place={place} />
          ))}
        </div>
      </div>
    </div>
  );
}
