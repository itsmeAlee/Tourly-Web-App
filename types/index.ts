export interface Hotel {
  $id: string;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  images: string[];
  amenities: string[];
  contact: string;
  rating: number;
}

export interface Place {
  $id: string;
  name: string;
  description: string;
  location: string;
  images: string[];
  activities: string[];
  rating: number;
}

export interface Guide {
  $id: string;
  name: string;
  bio: string;
  languages: string[];
  contact: string;
  rating: number;
  imageUrl: string;
}
