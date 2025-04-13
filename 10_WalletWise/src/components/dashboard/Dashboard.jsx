// src/components/dashboard/Dashboard.jsx
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Wallet, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Dashboard = ({
  balance,
  savings,
  minMonthlyBalance,
  currentMonthTotal,
  previousMonthTotal,
  showBalanceDialog,
  setShowBalanceDialog,
  tempBalance,
  setTempBalance,
  handleEditBalance
}) => {
  return (
    <>
      {/* Balance Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-slate-400">Available Balance</CardTitle>
            <Dialog open={showBalanceDialog} onOpenChange={setShowBalanceDialog}>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700" onClick={() => setShowBalanceDialog(true)}>
                <Edit className="h-4 w-4" />
              </Button>
              <DialogContent className="bg-slate-800 text-white border-slate-700">
                <DialogHeader>
                  <DialogTitle>Edit Available Balance</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="available-balance">Balance Amount</Label>
                    <div className="relative">
                      <span className="absolute left-2 top-2.5 h-4 w-4 text-slate-500">₹</span>
                      <Input 
                        id="available-balance"
                        type="number"
                        placeholder={balance.toString()}
                        value={tempBalance}
                        onChange={(e) => setTempBalance(e.target.value)}
                        className="pl-8 bg-slate-900 border-slate-700"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={handleEditBalance} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Update Balance
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{balance.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-400">Total Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">₹{savings.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Minimum Balance Card */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-purple-400" />
            Minimum Monthly Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">₹{minMonthlyBalance.toFixed(2)}</p>
            <Badge className={`${balance < minMonthlyBalance ? 'bg-red-900 text-red-200 border-red-800' : 'bg-green-900 text-green-200 border-green-800'}`}>
              {balance < minMonthlyBalance ? 'Below Minimum' : 'Above Minimum'}
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      {/* Monthly Spending Comparison */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Monthly Spending</CardTitle>
          <CardDescription className="text-slate-400">
            Current: ₹{currentMonthTotal} / Previous: ₹{previousMonthTotal}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress 
            value={(currentMonthTotal / previousMonthTotal) * 100} 
            className="h-2 mb-2 bg-slate-700" 
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">
              {currentMonthTotal < previousMonthTotal 
                ? `₹${(previousMonthTotal - currentMonthTotal).toFixed(2)} less than last month` 
                : `₹${(currentMonthTotal - previousMonthTotal).toFixed(2)} more than last month`}
            </span>
            {currentMonthTotal < previousMonthTotal && (
              <Badge className="bg-green-900 text-green-200 border-green-800">
                <Check className="h-3 w-3 mr-1" />
                Perk Eligible
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;