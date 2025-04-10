import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, TrendingUp, Target, Wallet, PiggyBank, ArrowUp, Sparkles, Plus, Minus, Calendar, Tag, Coffee, ShoppingBag, Home, Utensils, Car, Smartphone, Film, CreditCard, Check, Edit } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export default function GrowthQuest() {
  const [balance, setBalance] = useState(1250);
  const [tempBalance, setTempBalance] = useState("");
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);
  const [savings, setSavings] = useState(250);
  const [goalProgress, setGoalProgress] = useState(25);
  const [showExpenseAlert, setShowExpenseAlert] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [newExpense, setNewExpense] = useState(null);
  const [minMonthlyBalance, setMinMonthlyBalance] = useState(1000);
  const [showMinBalanceDialog, setShowMinBalanceDialog] = useState(false);
  const [tempMinBalance, setTempMinBalance] = useState("");
  const [previousMonthTotal, setPreviousMonthTotal] = useState(310); // Set a previous month total for comparison
  const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
  const [showPerkAlert, setShowPerkAlert] = useState(false);
  
  // Expense data
  const [expenses, setExpenses] = useState([
    { id: 1, date: "2025-04-10", amount: 25, description: "Coffee shop", category: "food" },
    { id: 2, date: "2025-04-09", amount: 45, description: "Dinner with friends", category: "food" },
    { id: 3, date: "2025-04-08", amount: 60, description: "Gas", category: "transportation" },
    { id: 4, date: "2025-04-07", amount: 15, description: "Movie ticket", category: "entertainment" },
    { id: 5, date: "2025-04-06", amount: 35, description: "Mobile bill", category: "utilities" },
    { id: 6, date: "2025-04-05", amount: 120, description: "Shoes", category: "shopping" },
  ]);
  
  // Category definitions with icons
  const categories = [
    { id: "food", name: "Food & Drink", icon: <Utensils className="h-4 w-4" />, color: "#FF6B6B" },
    { id: "shopping", name: "Shopping", icon: <ShoppingBag className="h-4 w-4" />, color: "#4ECDC4" },
    { id: "housing", name: "Housing", icon: <Home className="h-4 w-4" />, color: "#FFD166" },
    { id: "transportation", name: "Transportation", icon: <Car className="h-4 w-4" />, color: "#06D6A0" },
    { id: "utilities", name: "Utilities", icon: <Smartphone className="h-4 w-4" />, color: "#118AB2" },
    { id: "entertainment", name: "Entertainment", icon: <Film className="h-4 w-4" />, color: "#073B4C" },
    { id: "other", name: "Other", icon: <CreditCard className="h-4 w-4" />, color: "#6C757D" },
  ];

  // Calculate category totals for charts
  const getCategoryData = () => {
    const categoryTotals = {};
    
    categories.forEach(cat => {
      categoryTotals[cat.id] = 0;
    });
    
    expenses.forEach(expense => {
      if (categoryTotals[expense.category] !== undefined) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals.other += expense.amount;
      }
    });
    
    return Object.keys(categoryTotals).map(key => ({
      name: categories.find(cat => cat.id === key)?.name || key,
      value: categoryTotals[key],
      color: categories.find(cat => cat.id === key)?.color || "#6C757D"
    })).filter(item => item.value > 0);
  };
  
  const [challenges, setChallenges] = useState([
    { id: 1, title: 'Save ₹20,000 this month', progress: 45 },
    { id: 2, title: '7-day expense tracking', progress: 71 },
    { id: 3, title: 'Cut food expenses by 15%', progress: 60 },
  ]);
  
  const [savingsHistory] = useState([
    { month: 'Jan', amount: 5000 },
    { month: 'Feb', amount: 7500 },
    { month: 'Mar', amount: 9000 },
    { month: 'Apr', amount: 13500 },
    { month: 'May', amount: 12000 },
    { month: 'Jun', amount: 18000 },
    { month: 'Jul', amount: 22000 },
    { month: 'Aug', amount: 25000 },
  ]);

  // Handle adding an expense
  const handleAddExpense = () => {
    if (expenseAmount && expenseCategory) {
      const amount = parseFloat(expenseAmount);
      
      if (!isNaN(amount) && amount > 0) {
        const newExpenseItem = {
          id: expenses.length + 1,
          date: new Date().toISOString().split('T')[0],
          amount: amount,
          description: expenseDescription || "Expense",
          category: expenseCategory
        };
        
        setExpenses(prev => [newExpenseItem, ...prev]);
        setBalance(prev => prev - amount);
        setNewExpense(newExpenseItem);
        setShowExpenseAlert(true);
        
        // Add to current month total
        setCurrentMonthTotal(prev => prev + amount);
        
        // Check if still under previous month's spending
        if (currentMonthTotal + amount < previousMonthTotal) {
          setShowPerkAlert(true);
          setTimeout(() => {
            setShowPerkAlert(false);
          }, 3000);
        }
        
        // Reset form
        setExpenseAmount("");
        setExpenseDescription("");
        setExpenseCategory("");
        
        setTimeout(() => {
          setShowExpenseAlert(false);
        }, 3000);
      }
    }
  };
  
  // Handle setting minimum monthly balance
  const handleSetMinBalance = () => {
    const amount = parseFloat(tempMinBalance);
    if (!isNaN(amount) && amount >= 0) {
      setMinMonthlyBalance(amount);
      setShowMinBalanceDialog(false);
    }
  };
  
  // Handle editing available balance
  const handleEditBalance = () => {
    const amount = parseFloat(tempBalance);
    if (!isNaN(amount) && amount >= 0) {
      setBalance(amount);
      setShowBalanceDialog(false);
    }
  };

  // Function to get category icon
  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : <CreditCard className="h-4 w-4" />;
  };
  
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "Other";
  };
  
  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : "#6C757D";
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <PiggyBank className="h-8 w-8 text-purple-400" />
          <h1 className="text-2xl font-bold">GrowthQuest</h1>
        </div>
      </header>

      {/* Expense Added Alert */}
      {showExpenseAlert && newExpense && (
        <Alert className="mb-4 bg-blue-900 border-blue-700 text-blue-100">
          <AlertCircle className="h-4 w-4 text-blue-300" />
          <AlertTitle>Expense tracked: ₹{newExpense.amount}</AlertTitle>
          <AlertDescription>
            Your {getCategoryName(newExpense.category)} expense has been recorded.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Perk Alert */}
      {showPerkAlert && (
        <Alert className="mb-4 bg-green-900 border-green-700 text-green-100">
          <Sparkles className="h-4 w-4 text-green-300" />
          <AlertTitle>You've earned a perk!</AlertTitle>
          <AlertDescription>
            Your spending is lower than last month. Enjoy a 2% cashback on your next expense!
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Action Buttons */}
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
                onClick={handleAddExpense} 
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

      {/* Main App Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 bg-slate-800">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-700">Dashboard</TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-slate-700">Expenses</TabsTrigger>
          <TabsTrigger value="challenges" className="data-[state=active]:bg-slate-700">Challenges</TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-slate-700">Insights</TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-4">
          {/* Balance Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm text-slate-400">Available Balance</CardTitle>
                <Dialog open={showBalanceDialog} onOpenChange={setShowBalanceDialog}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
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
          
          {/* Progress Towards Goals */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Summer Vacation Goal</CardTitle>
              <CardDescription className="text-slate-400">₹{goalProgress * 500} of ₹50,000 saved</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={goalProgress} className="h-2 mb-2 bg-slate-700" />
              <div className="flex justify-between text-sm text-slate-400">
                <span>0%</span>
                <span>{goalProgress}%</span>
                <span>100%</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Spending Breakdown</CardTitle>
              <CardDescription className="text-slate-400">How you spend your money</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getCategoryData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {getCategoryData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <Separator className="mb-4 bg-slate-700" />
              
              <h3 className="font-medium mb-4">Recent Expenses</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {expenses.map(expense => (
                  <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-slate-600" style={{ color: getCategoryColor(expense.category) }}>
                        {getCategoryIcon(expense.category)}
                      </div>
                      <div>
                        <p className="font-medium">{expense.description}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {expense.date}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">-₹{expense.amount}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Challenges Tab */}
        <TabsContent value="challenges" className="space-y-4">
          <div className="grid gap-4">
            {challenges.map(challenge => (
              <Card key={challenge.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={challenge.progress} 
                    className="h-2 mb-2 bg-slate-700" 
                  />
                  <p className="text-sm text-right text-slate-400">{challenge.progress}% complete</p>
                </CardContent>
              </Card>
            ))}
            
            {/* Low Spender Perks */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Spending Less Perks</CardTitle>
                <CardDescription className="text-slate-400">Rewards for spending less than last month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700">
                    <div className="p-2 rounded-full bg-green-900 text-green-300">
                      <Wallet className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">2% Cashback on Next Expense</p>
                      <p className="text-sm text-slate-400">Spend less than previous month</p>
                    </div>
                    <Badge className="ml-auto">Active</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700">
                    <div className="p-2 rounded-full bg-blue-900 text-blue-300">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">0.5% Interest Bonus</p>
                      <p className="text-sm text-slate-400">If spending reduction continues for 3 months</p>
                    </div>
                    <Badge className="ml-auto bg-slate-600">Month 1/3</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700">
                    <div className="p-2 rounded-full bg-purple-900 text-purple-300">
                      <Target className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Priority Customer Support</p>
                      <p className="text-sm text-slate-400">Beat last month by 20%</p>
                    </div>
                    <Badge className="ml-auto bg-slate-600">Inactive</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Insights Tab */}
        <TabsContent value="insights">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Savings History</CardTitle>
              <CardDescription className="text-slate-400">Track your saving progress over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={savingsHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                    formatter={(value) => [`₹${value}`, 'Amount']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#A78BFA" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#A78BFA' }}
                    activeDot={{ r: 6, fill: '#A78BFA' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="mt-4 bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Saving Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Alert className="bg-blue-900 border-blue-800 text-blue-100">
                <AlertCircle className="h-4 w-4 text-blue-300" />
                <AlertTitle>Automate Your Savings</AlertTitle>
                <AlertDescription className="text-blue-200">
                  Set up automatic transfers to reach your goals faster.
                </AlertDescription>
              </Alert>
              <Alert className="bg-purple-900 border-purple-800 text-purple-100">
                <AlertCircle className="h-4 w-4 text-purple-300" />
                <AlertTitle>50/30/20 Rule</AlertTitle>
                <AlertDescription className="text-purple-200">
                  Try allocating 50% to needs, 30% to wants, and 20% to savings.
                </AlertDescription>
              </Alert>
              <Alert className="bg-green-900 border-green-800 text-green-100">
                <AlertCircle className="h-4 w-4 text-green-300" />
                <AlertTitle>Review Subscriptions</AlertTitle>
                <AlertDescription className="text-green-200">
                  Cancel unused subscriptions to save money every month.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}