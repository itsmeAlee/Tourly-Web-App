import { createAdminClient } from "@/lib/appwrite";
import { Place } from "@/types";
import { Query } from "node-appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PLACES_ID!;

export async function getPlaces() {
  const { databases } = await createAdminClient();
  const response = await databases.listDocuments<any>(
    DATABASE_ID,
    COLLECTION_ID,
    [Query.orderDesc("$createdAt")]
  );
  return response.documents as Place[];
}

export async function getPlace(id: string) {
  const { databases } = await createAdminClient();
  const response = await databases.getDocument<any>(
    DATABASE_ID,
    COLLECTION_ID,
    id
  );
  return response as Place;
}

export async function searchPlaces(query: string) {
    const { databases } = await createAdminClient();
    const response = await databases.listDocuments<any>(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.search("name", query)]
    );
    return response.documents as Place[];
}
