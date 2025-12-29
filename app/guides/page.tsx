import { getGuides } from '@/lib/db/guides';
import GuidesDirectory from '@/components/GuidesDirectory';

export const revalidate = 60;

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Tour Guides
          </h1>
          <p className="text-lg text-gray-600">
            Connect with experienced local guides for your Gilgit-Baltistan adventure
          </p>
        </div>

        <GuidesDirectory guides={guides} />
      </div>
    </div>
  );
}
