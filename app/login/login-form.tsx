'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth/AuthContext';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
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
    <Card 
      className="w-full max-w-md rounded-lg border"
    >
      <CardHeader className="text-center space-y-2 pb-8">
        <CardTitle className="text-4xl font-bold">
          Welcome <span className="text-primary">back</span>
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Continue your journey with us
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
              <Input 
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="h-12 pl-12 rounded-xl"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-foreground">Password</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
              <Input 
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="h-12 pl-12 rounded-xl"
              />
            </div>
          </div>
          
          {error && (
            <div className="text-sm text-destructive text-center">{error}</div>
          )}
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 text-base font-bold rounded-xl"
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </>
            )}
          </Button>
          
          <div className="text-center text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
