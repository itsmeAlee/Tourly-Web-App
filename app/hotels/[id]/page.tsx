import { getHotel } from "@/lib/db/hotels";
import HotelDetail from "@/components/HotelDetail";
import { notFound } from "next/navigation";

export default async function HotelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const hotel = await getHotel(id);
    return <HotelDetail hotel={hotel} />;
  } catch (error) {
    notFound();
  }
}
