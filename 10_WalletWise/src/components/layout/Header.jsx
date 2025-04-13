// src/components/layout/Header.jsx
import React from 'react';
import { PiggyBank } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <PiggyBank className="h-8 w-8 text-purple-400" />
        <h1 className="text-2xl font-bold">GrowthQuest</h1>
      </div>
    </header>
  );
};

export default Header;