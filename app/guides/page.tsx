import { getGuides } from '@/lib/db/guides';
import GuideCard from '@/components/GuideCard';

export const revalidate = 60;

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Tour Guides
          </h1>
          <p className="text-lg text-gray-600">
            Connect with experienced local guides for your Gilgit-Baltistan adventure
          </p>
        </div>

        {guides.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No tour guides available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <GuideCard key={guide.$id} guide={guide} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
