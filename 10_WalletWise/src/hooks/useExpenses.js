// src/hooks/useExpenses.js
import { useState } from 'react';

export const useExpenses = () => {
  const [showExpenseAlert, setShowExpenseAlert] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [newExpense, setNewExpense] = useState(null);
  const [showPerkAlert, setShowPerkAlert] = useState(false);

  return {
    expenseAmount,
    setExpenseAmount,
    expenseDescription,
    setExpenseDescription,
    expenseCategory,
    setExpenseCategory,
    showExpenseAlert,
    setShowExpenseAlert,
    newExpense,
    setNewExpense,
    showPerkAlert,
    setShowPerkAlert
  };
};