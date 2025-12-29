# Appwrite Setup Guide for Gilgit-Baltistan Tourism App

Follow these steps to configure your Appwrite backend for the project.

## 1. Create Project
1.  Log in to the [Appwrite Console](https://cloud.appwrite.io/console).
2.  Click **Create project**.
3.  Name it `GB Tour App` (or similar).
4.  Copy the **Project ID** from the settings page and paste it into `.env.local` as `NEXT_PUBLIC_APPWRITE_PROJECT_ID`.

## 2. Authentication
1.  Go to **Auth** > **Settings** in the left sidebar.
2.  Enable **Email/Password** provider.

## 3. Database & Collections
1.  Go to **Databases**.
2.  Click **Create database**.
3.  Name it `TourismDB`.
4.  Copy the **Database ID** and paste it into `.env.local` as `NEXT_PUBLIC_APPWRITE_DATABASE_ID`.

### A. Collection: Hotels
1.  Click on your database.
2.  Click **Create collection**. Name: `Hotels`.
3.  Copy the **Collection ID** -> `.env.local` (`NEXT_PUBLIC_APPWRITE_COLLECTION_HOTELS_ID`).
4.  **Attributes** (Create these):
    *   `name` (String, Size: 128, Required)
    *   `description` (String, Size: 5000, Required)
    *   `location` (String, Size: 256, Required)
    *   `pricePerNight` (Integer, Required)
    *   `images` (String, Array, Required) - *Stores Image URLs*
    *   `amenities` (String, Array, Optional)
    *   `contact` (String, Size: 128, Optional)
    *   `rating` (Float, Min: 0, Max: 5, Default: 0)
5.  **Indexes**:
    *   Key: `search_name`, Type: `Fulltext`, Attribute: `name`.
6.  **Permissions** (Settings tab):
    *   Role: `Any` -> `Read` (Allow public to view).
    *   Role: `Users` -> `Read` (Redundant but good practice).
    *   (Admin writes will be handled via API Key).

### B. Collection: Places
1.  Create collection `Places`.
2.  Copy **Collection ID** -> `.env.local` (`NEXT_PUBLIC_APPWRITE_COLLECTION_PLACES_ID`).
3.  **Attributes**:
    *   `name` (String, Size: 128, Required)
    *   `description` (String, Size: 5000, Required)
    *   `location` (String, Size: 256, Required)
    *   `images` (String, Array, Optional)
    *   `activities` (String, Array, Optional)
    *   `rating` (Float, Min: 0, Max: 5, Default: 0)
4.  **Indexes**:
    *   Key: `search_name`, Type: `Fulltext`, Attribute: `name`.
5.  **Permissions**:
    *   Role: `Any` -> `Read`.

### C. Collection: Guides (Future Phase)
1.  Create collection `Guides`.
2.  Copy **Collection ID** -> `.env.local` (`NEXT_PUBLIC_APPWRITE_COLLECTION_GUIDES_ID`).
3.  **Attributes**:
    *   `name` (String, 128, Required)
    *   `bio` (String, 1000, Required)
    *   `languages` (String, Array, Optional)
    *   `contact` (String, 128, Required)
    *   `rating` (Float, Default: 0)
    *   `imageUrl` (String, 1024, Optional)
4.  **Permissions**:
    *   Role: `Any` -> `Read`.

## 4. Storage
1.  Go to **Storage**.
2.  Click **Create bucket**. Name: `Images`.
3.  Copy **Bucket ID** -> `.env.local` (`NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES_ID`).
4.  **Permissions**:
    *   Role: `Any` -> `Read` (Crucial for displaying images on the frontend).
5.  **Allowed File Extensions** (Optional but recommended): `jpg, jpeg, png, webp`.

## 5. API Key (For Server-Side Admin Access)
1.  Go to **Overview** (Project Home) > **Integrations** > **API Keys**.
2.  Click **Create API Key**.
3.  Name: `NextJS Server`.
4.  **Scopes** (Select these):
    *   `documents.read`
    *   `documents.write`
    *   `files.read`
    *   `files.write`
    *   `users.read`
    *   `users.write`
5.  Copy the **API Key Secret** -> `.env.local` (`APPWRITE_API_KEY`).

## 6. Final Check
Ensure your `.env.local` looks like this:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key_secret
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_COLLECTION_HOTELS_ID=your_hotels_id
NEXT_PUBLIC_APPWRITE_COLLECTION_PLACES_ID=your_places_id
NEXT_PUBLIC_APPWRITE_COLLECTION_GUIDES_ID=your_guides_id
NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES_ID=your_bucket_id
```

## 7. Seeding Data
Since the database is empty, manually create a few documents in the `Hotels` and `Places` collections via the Appwrite Console to test the frontend.
