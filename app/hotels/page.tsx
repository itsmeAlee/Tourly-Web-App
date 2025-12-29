import { getHotels } from "@/lib/db/hotels";
import HotelsDirectory from "@/components/HotelsDirectory";

export const revalidate = 60; // ISR

export default async function HotelsPage() {
  const hotels = await getHotels();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Hotels
          </h1>
          <p className="text-lg text-gray-600">
            Discover handpicked accommodations with breathtaking mountain views
          </p>
        </div>

        <HotelsDirectory hotels={hotels} />
      </div>
    </div>
  );
}
