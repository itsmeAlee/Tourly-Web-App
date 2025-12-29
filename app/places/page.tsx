import { getPlaces } from "@/lib/db/places";
import PlacesDirectory from "@/components/PlacesDirectory";

export const revalidate = 60; // ISR

export default async function PlacesPage() {
  const places = await getPlaces();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Destinations
          </h1>
          <p className="text-lg text-gray-600">
            Discover stunning locations, pristine lakes, and majestic peaks
          </p>
        </div>

        <PlacesDirectory places={places} />
      </div>
    </div>
  );
}
