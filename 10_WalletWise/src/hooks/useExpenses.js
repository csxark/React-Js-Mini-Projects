// src/hooks/useExpenses.js
import { useState } from 'react';
import { mockExpenses } from '../data/mockData';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [showExpenseAlert, setShowExpenseAlert] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [newExpense, setNewExpense] = useState(null);
  const [previousMonthTotal, setPreviousMonthTotal] = useState(310);
  const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
  const [showPerkAlert, setShowPerkAlert] = useState(false);

  // Handle adding an expense
  const handleAddExpense = (balance, setBalance) => {
    if (expenseAmount && expenseCategory) {
      const amount = parseFloat(expenseAmount);
      if (balance >= amount) {
        const expense = {
          id: expenses.length + 1,
          date: new Date().toISOString().split('T')[0],
          amount: amount,
          description: expenseDescription || 'Unnamed expense',
          category: expenseCategory
        };

        setExpenses([expense, ...expenses]);
        setNewExpense(expense);
        setShowExpenseAlert(true);
        setBalance(balance - amount);
        setCurrentMonthTotal(prev => prev + amount);
        
        // Reset form
        setExpenseAmount("");
        setExpenseDescription("");
        setExpenseCategory("");
        
        // Show perk alert if spending less than previous month
        if (currentMonthTotal < previousMonthTotal) {
          setShowPerkAlert(true);
        }
        
        // Hide alerts after 3 seconds
        setTimeout(() => {
          setShowExpenseAlert(false);
          setShowPerkAlert(false);
        }, 3000);
      }
    }
  };

  return {
    expenses,
    setExpenses,
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
    currentMonthTotal,
    setCurrentMonthTotal,
    previousMonthTotal,
    showPerkAlert,
    setShowPerkAlert,
    handleAddExpense
  };
};