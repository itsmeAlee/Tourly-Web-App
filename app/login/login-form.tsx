'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth/AuthContext';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left Column - Header & OAuth Providers */}
        <div className="space-y-10">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold">
              Welcome <span className="text-primary">back</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Continue your journey with us
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-foreground">Quick Login</h3>
              <p className="text-sm text-muted-foreground">Sign in with your social account</p>
            </div>

            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                onClick={loginWithGoogle}
                disabled={loading}
                className="h-11 px-6 text-base font-semibold border-2 hover:bg-accent w-fit"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </div>

            <p className="text-xs text-muted-foreground max-w-sm">
              Protected by industry-standard security
            </p>
          </div>
        </div>

        {/* Right Column - Email/Password Form */}
        <div className="space-y-8">
          <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="h-11 pl-10 bg-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-foreground">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="h-11 pl-10 bg-white"
              />
            </div>
          </div>
          
          {error && (
            <div className="text-sm text-destructive text-center bg-destructive/10 p-3 rounded-lg">{error}</div>
          )}
          
          <Button 
            type="submit" 
            disabled={loading}
            className="h-11 px-8 text-base font-semibold w-fit"
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary font-semibold hover:underline">
            Sign up
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
