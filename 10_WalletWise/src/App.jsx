// src/pages/GrowthQuest.jsx
import React, { useState, useEffect } from 'react';
import { PiggyBank } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Dashboard from '../components/dashboard/Dashboard';
import Expenses from '../components/expenses/Expenses';
import Challenges from '../components/challenges/Challenges';
import Insights from '../components/insights/Insights';
import Header from '../components/layout/Header';
import ExpenseAlert from '../components/layout/ExpenseAlert';
import PerkAlert from '../components/layout/PerkAlert';
import QuickActions from '../components/layout/QuickActions';

import { useExpenses } from '../hooks/useExpenses';
import { useBalance } from '../hooks/useBalance';

export default function GrowthQuest() {
  const { 
    balance, 
    savings, 
    goalProgress, 
    minMonthlyBalance,
    showBalanceDialog, 
    setShowBalanceDialog,
    tempBalance, 
    setTempBalance,
    showMinBalanceDialog, 
    setShowMinBalanceDialog,
    tempMinBalance, 
    setTempMinBalance,
    handleEditBalance,
    handleSetMinBalance
  } = useBalance();

  const {
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
  } = useExpenses(balance, setBalance);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-6">
      <Header />

      {showExpenseAlert && newExpense && (
        <ExpenseAlert newExpense={newExpense} />
      )}
      
      {showPerkAlert && (
        <PerkAlert />
      )}

      <QuickActions 
        setExpenseAmount={setExpenseAmount}
        expenseAmount={expenseAmount}
        setExpenseCategory={setExpenseCategory}
        expenseCategory={expenseCategory}
        setExpenseDescription={setExpenseDescription}
        expenseDescription={expenseDescription}
        handleAddExpense={handleAddExpense}
        showMinBalanceDialog={showMinBalanceDialog}
        setShowMinBalanceDialog={setShowMinBalanceDialog}
        tempMinBalance={tempMinBalance}
        setTempMinBalance={setTempMinBalance}
        minMonthlyBalance={minMonthlyBalance}
        handleSetMinBalance={handleSetMinBalance}
      />

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 bg-slate-800">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-700">Dashboard</TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-slate-700">Expenses</TabsTrigger>
          <TabsTrigger value="challenges" className="data-[state=active]:bg-slate-700">Challenges</TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-slate-700">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          <Dashboard 
            balance={balance}
            savings={savings}
            goalProgress={goalProgress}
            minMonthlyBalance={minMonthlyBalance}
            currentMonthTotal={currentMonthTotal}
            previousMonthTotal={previousMonthTotal}
            showBalanceDialog={showBalanceDialog}
            setShowBalanceDialog={setShowBalanceDialog}
            tempBalance={tempBalance}
            setTempBalance={setTempBalance}
            handleEditBalance={handleEditBalance}
          />
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4">
          <Expenses expenses={expenses} />
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-4">
          <Challenges />
        </TabsContent>
        
        <TabsContent value="insights">
          <Insights />
        </TabsContent>
      </Tabs>
    </div>
  );
}