'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import { Account, Client, Models, ID, OAuthProvider } from 'appwrite';
import { uploadProfilePicture } from '@/lib/storage';

// Extend the User type to include custom preferences
interface CustomPreferences extends Models.Preferences {
  photoURL?: string;
}

interface Identity {
  $id: string;
  provider: string;
  providerUid: string;
  providerEmail?: string;
}

interface CustomUser extends Omit<Models.User<Models.Preferences>, 'prefs'> {
  prefs: CustomPreferences;
  identities?: Identity[];
}

type User = CustomUser | null;

interface AuthContextType {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  loginWithGoogle: () => void;
  uploadUserProfilePicture: (file: File) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const account = useMemo(() => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'placeholder');
    return new Account(client);
  }, []);

  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount
  const refreshUser = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser as CustomUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Save Google profile picture to user prefs
  const saveGoogleProfilePicture = async (currentUser: CustomUser) => {
    try {
      // Check if user has a Google identity
      const googleIdentity = currentUser.identities?.find(
        (identity) => identity.provider === 'google'
      );

      // Only proceed if user signed in with Google and doesn't have a photoURL saved
      if (googleIdentity && !currentUser.prefs?.photoURL) {
        // Get the avatar URL from Google via Appwrite
        const avatarUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/avatars/providers/google/${googleIdentity.providerUid}?width=200&height=200`;

        // Update user preferences with the photo URL
        const updatedUser = await account.updatePrefs({
          ...currentUser.prefs,
          photoURL: avatarUrl,
        });

        // Update local state with new prefs
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Failed to save Google profile picture:', error);
    }
  };

  useEffect(() => {
    const initUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser as CustomUser);

        // Check and save Google profile picture if needed
        await saveGoogleProfilePicture(currentUser as CustomUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, []);

  const login = async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password);
    await refreshUser();
  };

  const register = async (email: string, password: string, name: string) => {
    await account.create(ID.unique(), email, password, name);
    await account.createEmailPasswordSession(email, password);
    await refreshUser();
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const loginWithGoogle = () => {
    account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/`,
      `${window.location.origin}/login`
    );
  };

  const uploadUserProfilePicture = async (file: File) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      // Upload the file to Appwrite Storage
      const fileUrl = await uploadProfilePicture(file, user.$id);

      // Update user preferences with the new photo URL
      const updatedUser = await account.updatePrefs({
        ...user.prefs,
        photoURL: fileUrl,
      });

      // Update local state
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to upload profile picture:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, refreshUser, loginWithGoogle, uploadUserProfilePicture }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
