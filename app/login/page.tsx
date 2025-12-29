'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './login-form';
import { useAuth } from '@/lib/auth/AuthContext';

export default function LoginPage() {
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
    <div className="flex justify-center items-center min-h-screen bg-white">
      <LoginForm />
    </div>
  );
}
