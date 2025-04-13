// src/components/layout/PerkAlert.jsx
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PerkAlert = () => {
  return (
    <Alert className="mb-4 bg-green-900 border-green-700 text-green-100">
      <Sparkles className="h-4 w-4 text-green-300" />
      <AlertTitle>You've earned a perk!</AlertTitle>
      <AlertDescription>
        Your spending is lower than last month. Enjoy a 2% cashback on your next expense!
      </AlertDescription>
    </Alert>
  );
};

export default PerkAlert;