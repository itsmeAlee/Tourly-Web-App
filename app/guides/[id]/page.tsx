import { getGuide, getGuides } from '@/lib/db/guides';
import GuideDetail from '@/components/GuideDetail';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const guides = await getGuides();
  return guides.map((guide) => ({
    id: guide.$id,
  }));
}

export default async function GuideDetailPage({ params }: { params: { id: string } }) {
  try {
    const guide = await getGuide(params.id);
    
    return (
      <div className="min-h-screen bg-white pt-24 pb-16">
        <GuideDetail guide={guide} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
