// src/components/layout/ExpenseAlert.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getCategoryName } from '../../utils/categoryUtils';

const ExpenseAlert = ({ newExpense }) => {
  return (
    <Alert className="mb-4 bg-blue-900 border-blue-700 text-blue-100">
      <AlertCircle className="h-4 w-4 text-blue-300" />
      <AlertTitle>Expense tracked: ₹{newExpense.amount}</AlertTitle>
      <AlertDescription>
        Your {getCategoryName(newExpense.category)} expense has been recorded.
      </AlertDescription>
    </Alert>
  );
};

export default ExpenseAlert;

