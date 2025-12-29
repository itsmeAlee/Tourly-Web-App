## Plan: Gilgit-Baltistan Tourism App (Phase 1)

This plan focuses on setting up the Next.js architecture with Appwrite (Server-Side), Ant Design, and implementing the core Phase 1 features: Authentication and Public Listings (Hotels, Places).

### Steps

1.  **Install Dependencies & Setup Environment**
    *   Install `node-appwrite` (Server SDK), `antd`, `@ant-design/nextjs-registry`, `zod`, `react-hook-form`, and `lucide-react` (icons).
    *   Create `.env.local` for Appwrite credentials (Endpoint, Project ID, API Key).

2.  **Configure Appwrite & Server Client**
    *   Create `lib/appwrite.ts` to initialize the Appwrite client.
    *   Implement a helper to create a session-based client (for authenticated users) and an admin client (for public data fetching using API Key).

3.  **Setup Ant Design with Next.js**
    *   Create a `lib/antd-registry.tsx` component to handle Ant Design SSR styles.
    *   Wrap the root layout in the registry and configure a basic Ant Design theme.

4.  **Implement Authentication (Server Actions)**
    *   Create `lib/auth/actions.ts` for `signUp`, `signIn`, and `signOut`.
    *   Implement session management using HTTP-only cookies to store the Appwrite session secret.
    *   Build `/login` and `/signup` pages using Zod and React Hook Form.

5.  **Develop Core Data Layer**
    *   Define TypeScript interfaces in `types/index.ts` for `Hotel`, `Place`, `Guide`.
    *   Create `lib/db/hotels.ts` and `lib/db/places.ts` with functions to fetch data from Appwrite Databases.

6.  **Build Public Pages (SSR)**
    *   **Home Page**: Feature highlights and search entry point.
    *   **Listings**: `/hotels`, `/places` pages using Server Components to fetch and display data in Ant Design Cards.
    *   **Details**: Dynamic routes `/hotels/[id]` and `/places/[id]` for detailed views.

### Further Considerations
1.  **Appwrite Setup**: Have you already created the Appwrite Project and Database/Collections in the Appwrite Console? I will need the IDs for these collections.
2.  **Images**: We will use Appwrite Storage for images. Ensure a bucket is created.
3.  **Seed Data**: Since the DB is empty, we might need a script or manual entry to add some dummy hotels/places for testing.
