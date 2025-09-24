'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Train, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { authUser, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && authUser) {
      router.push('/dashboard');
    }
  }, [authUser, loading, router]);
  
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      // The useEffect will handle the redirect
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally, show a toast notification for the error
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex items-center justify-center rounded-full bg-primary p-4 text-primary-foreground w-20 h-20">
              <Train className="h-10 w-10" />
            </div>
            <CardTitle className="font-headline text-3xl">Kochi Metro DocuSnap</CardTitle>
            <CardDescription className="pt-2">
              Automated Document Intelligence for KMRL
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <p className="text-center text-sm text-muted-foreground">
              Log in with your official Google account to continue.
            </p>
            <div className="flex flex-col space-y-2">
               <Button size="lg" onClick={handleLogin} disabled={loading}>
                 <LogIn className="mr-2 h-5 w-5" />
                 {loading ? 'Authenticating...' : 'Sign in with Google'}
              </Button>
            </div>
          </CardContent>
        </Card>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kochi Metro Rail Limited. All rights reserved.
        </p>
      </div>
    </div>
  );
}
