import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, BarChart3, PieChart, Calendar, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import SavingsChart from '@/components/analytics/SavingsChart';
import ExpenseTrends from '@/components/analytics/ExpenseTrends';
import { getCurrentUser, getExpenses } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { groupExpensesByCategory } from '@/lib/utils';

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('year');
  const [year, setYear] = useState(new Date().getFullYear());
  const [expenseData, setExpenseData] = useState([]);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        setIsLoading(true);
        
        // Get current user
        const { user } = await getCurrentUser();
        
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        // Get expenses for analytics
        const startDate = new Date(year, 0, 1).toISOString().split('T')[0];
        const endDate = new Date(year, 11, 31).toISOString().split('T')[0];
        
        const { expenses } = await getExpenses(user.id, {
          startDate,
          endDate
        });
        
        setExpenseData(expenses || []);
      } catch (error) {
        console.error('Error loading analytics data:', error);
        toast({
          variant: 'destructive',
          title: 'Error loading analytics',
          description: 'There was a problem loading your financial analytics.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAnalyticsData();
  }, [year, toast]);
  
  // Generate mock data for demonstration
  const generateMockData = () => {
    // Monthly savings data
    const savingsData = Array(12).fill().map((_, idx) => ({
      month: idx + 1,
      amount: Math.floor(Math.random() * 1000) + 500
    }));
    
    // Monthly expense data
    const expenseData = Array(12).fill().map((_, idx) => ({
      month: idx + 1,
      amount: Math.floor(Math.random() * 800) + 300
    }));
    
    // Expense categories data
    const categories = ['Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Healthcare'];
    const expensesByCategory = categories.map(category => ({
      category,
      amount: Math.floor(Math.random() * 2000) + 500,
      percentage: Math.floor(Math.random() * 30) + 5
    }));
    
    return { savingsData, expenseData, expensesByCategory };
  };
  
  const { savingsData, mockExpenseData, expensesByCategory } = generateMockData();
  
  // Process real expense data if available
  const processExpenseData = () => {
    if (!expenseData || expenseData.length === 0) return { processedExpenseData: mockExpenseData, processCategoryData: expensesByCategory };
    
    // Group by month
    const monthlyExpenses = Array(12).fill().map((_, idx) => {
      const month = idx + 1;
      const monthExpenses = expenseData.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() + 1 === month && expDate.getFullYear() === year;
      });
      
      const amount = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      
      return { month, amount };
    });
    
    // Group by category
    const categoriesMap = groupExpensesByCategory(expenseData);
    const totalAmount = Object.values(categoriesMap).reduce((sum, amount) => sum + amount, 0);
    
    const categoryData = Object.entries(categoriesMap).map(([category, amount]) => ({
      category,
      amount,
      percentage: totalAmount > 0 ? (amount / totalAmount) * 100 : 0
    }));
    
    return { processedExpenseData: monthlyExpenses, processCategoryData: categoryData };
  };
  
  const { processedExpenseData, processCategoryData } = processExpenseData();
  
  const handleDownloadReport = () => {
    toast({
      title: 'Report download started',
      description: 'Your financial report is being generated and will download shortly.',
    });
    
    // This would normally trigger a real download
    setTimeout(() => {
      toast({
        title: 'Download complete',
        description: 'Your financial report has been downloaded successfully.',
      });
    }, 2000);
  };
  
  const availableYears = [
    new Date().getFullYear(),
    new Date().getFullYear() - 1,
    new Date().getFullYear() - 2
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Visualize and understand your financial patterns
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={year.toString()} onValueChange={(value) => setYear(parseInt(value))}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleDownloadReport}>
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="savings" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Savings
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Expenses
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              <Skeleton className="h-[450px] rounded-lg" />
              <Skeleton className="h-[450px] rounded-lg" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              <SavingsChart 
                savingsData={savingsData} 
                expenseData={processedExpenseData} 
              />
              <ExpenseTrends expensesByCategory={processCategoryData} />
            </div>
          )}
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Financial Health Score</CardTitle>
              <CardDescription>An overall assessment of your financial habits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Your Score</span>
                  <span className="text-lg font-bold">78/100</span>
                </div>
                
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: '78%' }}></div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <ScoreCard title="Savings Rate" score="75%" status="good" />
                  <ScoreCard title="Expense Management" score="82%" status="excellent" />
                  <ScoreCard title="Goal Progress" score="66%" status="average" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="savings">
          <div className="space-y-6">
            {isLoading ? (
              <Skeleton className="h-[450px] rounded-lg" />
            ) : (
              <SavingsChart 
                savingsData={savingsData} 
                expenseData={processedExpenseData} 
              />
            )}
            
            <div className="grid gap-6 md:grid-cols-3">
              <MetricCard
                title="Avg. Monthly Savings"
                value="$876.33"
                change="+12.4%"
                changeType="positive"
              />
              <MetricCard
                title="Savings Streak"
                value="4 months"
                change="+2"
                changeType="positive"
              />
              <MetricCard
                title="Annual Savings Rate"
                value="24.3%"
                change="+3.1%"
                changeType="positive"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="expenses">
          <div className="space-y-6">
            {isLoading ? (
              <Skeleton className="h-[450px] rounded-lg" />
            ) : (
              <ExpenseTrends expensesByCategory={processCategoryData} />
            )}
            
            <div className="grid gap-6 md:grid-cols-3">
              <MetricCard
                title="Avg. Monthly Spending"
                value="$1,567.42"
                change="-8.2%"
                changeType="positive"
              />
              <MetricCard
                title="Largest Category"
                value="Housing"
                change="32.5%"
                changeType="neutral"
              />
              <MetricCard
                title="Discretionary Spending"
                value="$487.91"
                change="+5.7%"
                changeType="negative"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

function ScoreCard({ title, score, status }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return 'bg-emerald-500';
      case 'good': return 'bg-blue-500';
      case 'average': return 'bg-amber-500';
      case 'poor': return 'bg-rose-500';
      default: return 'bg-gray-500';
    }
  };
  
  const bgColor = getStatusColor(status);
  
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className={`h-2 w-2 rounded-full ${bgColor}`}></div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold">{score}</span>
        <span className="text-xs capitalize">{status}</span>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, changeType }) {
  const getChangeColor = (type) => {
    switch(type) {
      case 'positive': return 'text-emerald-500';
      case 'negative': return 'text-rose-500';
      default: return 'text-muted-foreground';
    }
  };
  
  const changeColor = getChangeColor(changeType);
  const changePrefix = changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : '';
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">{title}</span>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold">{value}</span>
            <span className={`text-sm font-medium ${changeColor}`}>
              {changePrefix} {change}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}