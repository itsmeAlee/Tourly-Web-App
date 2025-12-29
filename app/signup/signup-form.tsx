'use client';

import { signUp } from '@/lib/auth/actions';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);

    try {
      await signUp(formData);
    } catch (err) {
      console.error(err);
      setError('Signup failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Card 
      className="w-full max-w-md rounded-3xl"
      style={{ boxShadow: 'var(--shadow-floating-lg)' }}
    >
      <CardHeader className="text-center space-y-2 pb-8">
        <CardTitle className="text-4xl font-bold">
          Start your <span className="text-primary">journey</span>
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Create an account to explore amazing places
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-foreground">Full Name</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
              <Input 
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className="h-12 pl-12 rounded-xl"
              />
            </div>
          </div>
          
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
                placeholder="At least 8 characters"
                required
                minLength={8}
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
            style={{boxShadow: 'var(--shadow-tactile)'}}
          >
            {loading ? (
              "Creating account..."
            ) : (
              <>
                <Rocket className="w-5 h-5 mr-2" />
                Get Started
              </>
            )}
          </Button>
          
          <div className="text-center text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
