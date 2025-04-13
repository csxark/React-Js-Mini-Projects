import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const UserProfile = () => {
  const { user, signOut } = useAuth();

  const getInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8 border border-slate-700">
        <AvatarFallback className="bg-purple-900 text-white">
          {getInitials(user?.email)}
        </AvatarFallback>
      </Avatar>
      <div className="hidden md:block">
        <p className="text-sm font-medium text-white">{user?.email}</p>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={signOut}
        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserProfile;