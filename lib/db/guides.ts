import { createAdminClient } from "@/lib/appwrite";
import { Guide } from "@/types";
import { Query } from "node-appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_GUIDES_ID!;

export async function getGuides() {
  const { databases } = await createAdminClient();
  const response = await databases.listDocuments<any>(
    DATABASE_ID,
    COLLECTION_ID,
    [Query.orderDesc("rating")]
  );
  return response.documents as Guide[];
}

export async function getGuide(id: string) {
  const { databases } = await createAdminClient();
  const response = await databases.getDocument<any>(
    DATABASE_ID,
    COLLECTION_ID,
    id
  );
  return response as Guide;
}

export async function searchGuides(query: string) {
    const { databases } = await createAdminClient();
    const response = await databases.listDocuments<any>(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.search("name", query)]
    );
    return response.documents as Guide[];
}
