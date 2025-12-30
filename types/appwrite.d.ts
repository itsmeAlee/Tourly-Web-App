import { Models } from 'appwrite';

// Extend Appwrite's Preferences type to include custom fields
declare module 'appwrite' {
  namespace Models {
    interface Preferences {
      photoURL?: string;
    }
    
    interface User<Preferences extends Models.Preferences> {
      identities?: Array<{
        $id: string;
        provider: string;
        providerUid: string;
        providerEmail?: string;
        providerAccessToken?: string;
        providerAccessTokenExpiry?: string;
        providerRefreshToken?: string;
      }>;
    }
  }
}

export {};
