import React, { useState } from 'react';
import { useAuth } from './../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PiggyBank } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login');
  const { signIn, signUp } = useAuth();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
      }
    } catch (error) {
      setError(error.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <PiggyBank className="h-10 w-10 text-purple-500" />
            <CardTitle className="text-2xl font-bold text-white">GrowthQuest</CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            {mode === 'login' ? 'Enter your credentials to sign in' : 'Create an account to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full" onValueChange={setMode}>
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-800">
              <TabsTrigger value="login" className="data-[state=active]:bg-slate-700">Login</TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-slate-700">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-slate-200">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 text-slate-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-slate-200">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 text-slate-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                {error && (
                  <div className="rounded-md bg-red-950 border border-red-800 p-3 text-sm text-red-200">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium" 
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-slate-200">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 text-slate-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-slate-200">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 text-slate-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                {error && (
                  <div className="rounded-md bg-red-950 border border-red-800 p-3 text-sm text-red-200">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium" 
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;