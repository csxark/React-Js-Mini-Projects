// src/components/layout/QuickActions.jsx
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '../../utils/categoryUtils';

const QuickActions = ({
  setExpenseAmount,
  expenseAmount,
  setExpenseCategory,
  expenseCategory,
  setExpenseDescription,
  expenseDescription,
  handleAddExpense,
  showMinBalanceDialog,
  setShowMinBalanceDialog,
  tempMinBalance,
  setTempMinBalance,
  minMonthlyBalance,
  handleSetMinBalance,
  balance,
  setBalance
}) => {
  const onAddExpense = () => {
    handleAddExpense(balance, setBalance);
  };

  return (
    <div className="flex gap-2 mb-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex-1 bg-slate-700 hover:bg-slate-800 text-white">
            <Minus className="h-4 w-4 mr-2" /> Add Expense
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-800 text-white border-slate-700">
          <DialogHeader>
            <DialogTitle>Track New Expense</DialogTitle>
            <DialogDescription className="text-slate-400">
              Record your spending to get personalized saving tips
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-2 top-2.5 h-4 w-4 text-slate-500">₹</span>
                <Input 
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="pl-8 bg-slate-900 border-slate-700"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={setExpenseCategory} value={expenseCategory}>
                <SelectTrigger className="bg-slate-900 border-slate-700">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id} className="text-white focus:bg-slate-700 focus:text-white">
                      <div className="flex items-center">
                        <span className="mr-2">{cat.icon}</span>
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input 
                id="description"
                placeholder="What was this for?"
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
                className="bg-slate-900 border-slate-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={onAddExpense} 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!expenseAmount || !expenseCategory}
            >
              Add Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showMinBalanceDialog} onOpenChange={setShowMinBalanceDialog}>
        <DialogTrigger asChild>
          <Button className="flex-1 bg-purple-700 hover:bg-purple-800 text-white">
            <Plus className="h-4 w-4 mr-2" /> Set Min Balance
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-800 text-white border-slate-700">
          <DialogHeader>
            <DialogTitle>Set Minimum Monthly Balance</DialogTitle>
            <DialogDescription className="text-slate-400">
              Maintain this amount in your account each month
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="min-balance">Minimum Balance Amount</Label>
              <div className="relative">
                <span className="absolute left-2 top-2.5 h-4 w-4 text-slate-500">₹</span>
                <Input 
                  id="min-balance"
                  type="number"
                  placeholder="1000.00"
                  value={tempMinBalance}
                  onChange={(e) => setTempMinBalance(e.target.value)}
                  className="pl-8 bg-slate-900 border-slate-700"
                />
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Current minimum balance: ₹{minMonthlyBalance.toFixed(2)}
            </p>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleSetMinBalance} 
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Set Minimum Balance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickActions;