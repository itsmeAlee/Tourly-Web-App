import { Client, Storage } from 'appwrite';

// Lazy initialization to prevent build crashes
let client: Client | null = null;
let storage: Storage | null = null;

function getStorage() {
  if (!client) {
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

    // Fallback to prevent crash if env vars are missing during build
    // This allows the module to load without erroring
    client = new Client()
      .setEndpoint(endpoint || 'https://cloud.appwrite.io/v1')
      .setProject(projectId || 'placeholder');
  }

  if (!storage) {
    storage = new Storage(client!);
  }

  return storage as Storage;
}

// Storage bucket ID for profile pictures
export const PROFILE_PICTURES_BUCKET_ID = process.env.NEXT_PUBLIC_PROFILE_PICTURES_BUCKET_ID || 'profile-pictures';

/**
 * Upload a profile picture to Appwrite Storage
 * @param file - The file to upload
 * @param userId - The user's ID (used for filename uniqueness)
 * @returns The URL of the uploaded file
 */
export async function uploadProfilePicture(file: File, userId: string): Promise<string> {
  try {
    // Delete old profile picture if it exists
    // We'll use userId as the file ID to ensure uniqueness and easy deletion
    const storage = getStorage();
    try {
      await storage.deleteFile(PROFILE_PICTURES_BUCKET_ID, userId);
    } catch {
      // File doesn't exist, which is fine
    }

    // Upload the new file with userId as the file ID
    const response = await storage.createFile(
      PROFILE_PICTURES_BUCKET_ID,
      userId, // Use userId as file ID for easy management
      file
    );

    // Get the file view URL
    const fileUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${PROFILE_PICTURES_BUCKET_ID}/files/${response.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

    return fileUrl;
  } catch (error) {
    console.error('Failed to upload profile picture:', error);
    throw new Error('Failed to upload profile picture');
  }
}

/**
 * Delete a profile picture from Appwrite Storage
 * @param userId - The user's ID
 */
export async function deleteProfilePicture(userId: string): Promise<void> {
  try {
    const storage = getStorage();
    await storage.deleteFile(PROFILE_PICTURES_BUCKET_ID, userId);
  } catch (error) {
    console.error('Failed to delete profile picture:', error);
    throw new Error('Failed to delete profile picture');
  }
}
