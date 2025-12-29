'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from './signup-form';
import { useAuth } from '@/lib/auth/AuthContext';

export default function SignupPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen gradient-bg">
      <SignupForm />
    </div>
  );
}
