import { useState, useEffect } from 'react';
import { PlusCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import SavingsOverview from '@/components/dashboard/SavingsOverview';
import ExpenseInsights from '@/components/dashboard/ExpenseInsights';
import SavingsGoalTracker from '@/components/dashboard/SavingsGoalTracker';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUser, getExpenses, getSavingsGoals } from '@/lib/supabase';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Get current user
        const { user } = await getCurrentUser();
        setCurrentUser(user);
        
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        // Get user expenses
        const { expenses: userExpenses } = await getExpenses(user.id);
        setExpenses(userExpenses || []);
        
        // Get savings goals
        const { goals } = await getSavingsGoals(user.id);
        setSavingsGoals(goals || []);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast({
          variant: 'destructive',
          title: 'Error loading data',
          description: 'There was a problem loading your dashboard data.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, [toast]);
  
  // This would normally come from the API
  // Mocking data for demonstration purposes
  const mockSavingsData = {
    currentBalance: 10250.75,
    minimumBalance: 1000,
    monthlySavingsTarget: 1500,
    actualMonthlySavings: 1125.50,
    totalSaved: 12345.67,
    savingsStreak: 4,
  };
  
  // Mock transactions for demonstration
  const mockTransactions = [
    {
      id: 1,
      description: 'Grocery Shopping',
      amount: 78.94,
      category: 'food',
      date: '2023-04-15',
    },
    {
      id: 2,
      description: 'Electric Bill',
      amount: 120.50,
      category: 'utilities',
      date: '2023-04-12',
    },
    {
      id: 3,
      description: 'Movie Night',
      amount: 45.00,
      category: 'entertainment',
      date: '2023-04-10',
    },
  ];
  
  // Mock savings goals for demonstration
  const mockGoals = [
    {
      id: 1,
      title: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 5000,
      targetDate: '2023-12-31',
      category: 'emergency',
    },
    {
      id: 2,
      title: 'Dream Vacation',
      targetAmount: 3000,
      currentAmount: 1200,
      targetDate: '2023-08-15',
      category: 'travel',
    },
  ];

  const handleAddGoal = () => {
    // Navigate to goals page with modal open
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back{currentUser?.email ? `, ${currentUser.email.split('@')[0]}` : ''}!
          </p>
        </div>
        <Button asChild>
          <Link to="/expenses/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
          </Link>
        </Button>
      </div>
      
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <SavingsOverview savingsData={mockSavingsData} />
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <ExpenseInsights 
                expenses={expenses.length > 0 ? expenses : mockTransactions} 
                recentTransactions={expenses.length > 0 ? expenses : mockTransactions} 
              />
            </div>
            <div className="md:col-span-1">
              <SavingsGoalTracker 
                goals={savingsGoals.length > 0 ? savingsGoals : mockGoals}
                onAddGoal={handleAddGoal}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center border rounded-lg p-4 bg-muted/20">
            <div>
              <h3 className="font-semibold">Want deeper insights?</h3>
              <p className="text-sm text-muted-foreground">
                Check your complete financial analytics for more detailed information.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/analytics">
                View Analytics <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[120px] rounded-lg" />
        <Skeleton className="h-[120px] rounded-lg" />
        <Skeleton className="h-[120px] rounded-lg" />
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Skeleton className="h-[400px] rounded-lg" />
        </div>
        <div className="md:col-span-1">
          <Skeleton className="h-[400px] rounded-lg" />
        </div>
      </div>
    </div>
  );
}