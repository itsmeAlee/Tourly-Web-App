'use client';

import { signIn } from '@/lib/auth/actions';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);

    try {
      await signIn(formData);
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <Card 
      className="glass-card w-full max-w-md border-0 shadow-2xl"
      style={{ borderRadius: '24px' }}
    >
      <CardHeader className="text-center space-y-2 pb-8">
        <CardTitle className="text-4xl font-black">
          Welcome <span className="bg-gradient-to-r from-teal-700 to-orange-500 bg-clip-text text-transparent">back</span>
        </CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Continue your journey with us
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 w-5 h-5" />
              <Input 
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="h-12 pl-12 rounded-xl border-gray-200 focus:border-teal-500"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 w-5 h-5" />
              <Input 
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="h-12 pl-12 rounded-xl border-gray-200 focus:border-teal-500"
              />
            </div>
          </div>
          
          {error && (
            <div className="text-sm text-red-600 text-center">{error}</div>
          )}
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 text-base font-bold rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-lg shadow-teal-500/30"
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
          
          <div className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-orange-500 font-semibold hover:text-orange-600">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
