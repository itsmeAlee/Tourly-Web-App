import { getPlace } from "@/lib/db/places";
import PlaceDetail from "@/components/PlaceDetail";
import { notFound } from "next/navigation";

export default async function PlacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const place = await getPlace(id);
    return <PlaceDetail place={place} />;
  } catch (error) {
    notFound();
  }
}
