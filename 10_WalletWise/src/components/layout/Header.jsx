// src/components/layout/Header.jsx
import React from 'react';
import { PiggyBank } from 'lucide-react';
import UserProfile from '../../auth/UserProfile';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <PiggyBank className="h-8 w-8 text-purple-400" />
        <h1 className="text-2xl font-bold">GrowthQuest</h1>
      </div>
      {user && <UserProfile />}
    </header>
  );
};

export default Header;