import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Lock } from 'lucide-react';

export default function LoginPage() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const dispatch = useAppDispatch();
 const navigate = useNavigate();

 const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  // Validate credentials
  if (username === 'user' && password === 'password') {
   dispatch(login(username));
   navigate('/');
  } else {
   setError('Invalid username or password. Please use "user" / "password"');
  }
 };

 return (
  <div className="flex items-center justify-center min-h-screen gradient-mesh p-4 relative overflow-hidden">
   {/* Animated Background Elements */}
   <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl float" />
   <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" style={{ animation: 'float 4s ease-in-out infinite' }} />

   <Card className="w-full max-w-md glass-dark border-primary/20 shadow-2xl relative z-10 hover-lift">
    <CardHeader className="space-y-1 text-center pb-6">
     <div className="flex justify-center mb-4">
      <div className="p-4 gradient-primary rounded-2xl shadow-lg pulse-glow">
       <Lock className="w-10 h-10 text-white" />
      </div>
     </div>
     <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
      Welcome Back
     </CardTitle>
     <CardDescription className="text-base">
      Enter your credentials to access the store
     </CardDescription>
    </CardHeader>
    <form onSubmit={handleLogin}>
     <CardContent className="space-y-5">
      {error && (
       <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm flex items-center gap-2">
        <span className="text-lg">⚠️</span>
        <span>{error}</span>
       </div>
      )}
      <div className="space-y-2">
       <Label htmlFor="username" className="text-sm font-semibold">Username</Label>
       <Input
        id="username"
        type="text"
        placeholder="user"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="h-11 border-primary/30 focus:border-primary transition-all"
        required
       />
      </div>
      <div className="space-y-2">
       <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
       <Input
        id="password"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="h-11 border-primary/30 focus:border-primary transition-all"
        required
       />
      </div>
     </CardContent>
     <CardFooter className="flex flex-col gap-3">
      <Button
       type="submit"
       className="w-full h-11 gradient-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
      >
       Sign In
      </Button>
      <div className="text-xs text-center text-muted-foreground bg-muted/30 px-4 py-2 rounded-lg">
       💡 Use <span className="font-semibold text-primary">"user"</span> / <span className="font-semibold text-primary">"password"</span> to login
      </div>
     </CardFooter>
    </form>
   </Card>
  </div>
 );
}
