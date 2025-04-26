import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import QuickActions from './components/layout/QuickActions';
import Dashboard from './components/dashboard/Dashboard';
import Expenses from './components/expenses/Expenses';
import Insights from './components/insights/Insights';
import PerkAlert from './components/layout/PerkAlert';
import ExpenseAlert from './components/layout/ExpenseAlert';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Auth from './auth/Auth'; 
import { 
  getUserBalance, 
  updateUserBalance, 
  getUserExpenses, 
  addExpense, 
  getUserSavings,
} from './services/databaseServce';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DEFAULT_USER_SETTINGS = {
  balance: 0,
  savings: 0,
  min_monthly_balance: 0,
  current_month_total: 0,
  previous_month_total: 0
};

const AppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expenses, setExpenses] = useState([]);
  const [savingsHistory, setSavingsHistory] = useState([]);
  const [userSettings, setUserSettings] = useState(DEFAULT_USER_SETTINGS);
  const [username, setUsername] = useState('');
  
  // Dialog states
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);
  const [showMinBalanceDialog, setShowMinBalanceDialog] = useState(false);
  const [tempBalance, setTempBalance] = useState('');
  const [tempMinBalance, setTempMinBalance] = useState('');
  
  // New expense state
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [showExpenseAlert, setShowExpenseAlert] = useState(false);
  const [newExpense, setNewExpense] = useState(null);
  
  // Show perk alert if spending less
  const showPerkAlert = userSettings && userSettings.current_month_total < userSettings.previous_month_total;

  // Get username when authenticated
  useEffect(() => {
    const getUserCredentials = async () => {
      if (!user?.email) return;
      
      try {
        const userData = await findUserByUsername(user.email.split('@')[0]);
        if (userData) {
          setUsername(userData.username);
        } else {
          // Default to email prefix if not found
          setUsername(user.email.split('@')[0]);
        }
      } catch (error) {
        console.error('Error getting user credentials:', error);
        setUsername(user.email.split('@')[0]);
      }
    };
    
    getUserCredentials();
  }, [user]);

  // Load user data when authenticated and username is available
  useEffect(() => {
    const loadUserData = async () => {
      if (!user?.id || !username) return;
      
      try {
        // Load user balance
        const balanceData = await getUserBalance(username);
        
        // Get current and previous month expenses
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        
        // Calculate previous month and year
        const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
        
        // Load expenses
        const userExpenses = await getUserExpenses(username);
        setExpenses(userExpenses || []);
        
        // Calculate current month total
        const currentMonthExpenses = userExpenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getMonth() + 1 === currentMonth && 
                 expenseDate.getFullYear() === currentYear;
        });
        
        const currentMonthTotal = currentMonthExpenses.reduce(
          (total, expense) => total + parseFloat(expense.amount), 0
        );
        
        // Calculate previous month total
        const prevMonthExpenses = userExpenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getMonth() + 1 === prevMonth && 
                 expenseDate.getFullYear() === prevYear;
        });
        
        const previousMonthTotal = prevMonthExpenses.reduce(
          (total, expense) => total + parseFloat(expense.amount), 0
        );
        
        // Load savings history
        const history = await getUserSavings(username);
        setSavingsHistory(history || []);
        
        // Calculate total savings
        const totalSavings = history.reduce(
          (total, month) => total + parseFloat(month.savings_amount || 0), 0
        );
        
        // Set user settings
        setUserSettings({
          balance: balanceData?.current_balance || 0,
          min_monthly_balance: balanceData?.min_monthly_balance || 0,
          savings: totalSavings,
          current_month_total: currentMonthTotal,
          previous_month_total: previousMonthTotal
        });
      } catch (error) {
        console.error('Error loading user data:', error);
        // Set default values in case of error
        setUserSettings(DEFAULT_USER_SETTINGS);
      }
    };
    
    if (username) {
      loadUserData();
    }
  }, [user, username]);

  // Edit balance handler
  const handleEditBalance = async () => {
    if (!tempBalance || !username) return;
    
    try {
      const newBalance = parseFloat(tempBalance);
      
      // Update balance in database
      await updateUserBalance(username, newBalance);
      
      // Update local state
      setUserSettings(prev => ({
        ...prev,
        balance: newBalance
      }));
      
      setShowBalanceDialog(false);
      setTempBalance('');
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  // Set minimum balance handler
  const handleSetMinBalance = async () => {
    if (!tempMinBalance || !username) return;
    
    try {
      const minBalance = parseFloat(tempMinBalance);
      
      // We'll need to modify the database service to support min_monthly_balance updates
      // This is a placeholder implementation
      const { data, error } = await supabase
        .from('user_balance')
        .update({ min_monthly_balance: minBalance })
        .eq('username', username)
        .select();
      
      if (error) throw error;
      
      // Update local state
      setUserSettings(prev => ({
        ...prev,
        min_monthly_balance: minBalance
      }));
      
      setShowMinBalanceDialog(false);
      setTempMinBalance('');
    } catch (error) {
      console.error('Error updating minimum balance:', error);
    }
  };

  // Add expense handler
  const handleAddExpense = async () => {
    if (!expenseAmount || !expenseCategory || !username) return;
    
    try {
      const amount = parseFloat(expenseAmount);
      
      const expenseData = {
        username: username,
        category: expenseCategory,
        amount: amount,
        description: expenseDescription || 'Expense',
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toTimeString().slice(0, 8)
      };
      
      // Add expense to database
      const addedExpense = await addExpense(expenseData);
      
      if (!addedExpense) {
        throw new Error('Failed to add expense');
      }
      
      // Calculate new values
      const newBalance = (userSettings.balance || 0) - amount;
      const newMonthTotal = (userSettings.current_month_total || 0) + amount;
      
      // Update user settings state
      setUserSettings(prev => ({
        ...prev,
        balance: newBalance,
        current_month_total: newMonthTotal
      }));
      
      // Update expenses list
      setExpenses(prev => [addedExpense, ...prev]);
      
      // Show expense alert
      setNewExpense(addedExpense);
      setShowExpenseAlert(true);
      setTimeout(() => setShowExpenseAlert(false), 5000);
      
      // Reset form
      setExpenseAmount('');
      setExpenseCategory('');
      setExpenseDescription('');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        {showExpenseAlert && <ExpenseAlert newExpense={newExpense} />}
        {showPerkAlert && <PerkAlert />}
        
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
          minMonthlyBalance={userSettings.min_monthly_balance}
          handleSetMinBalance={handleSetMinBalance}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard 
              balance={userSettings.balance}
              savings={userSettings.savings}
              minMonthlyBalance={userSettings.min_monthly_balance}
              currentMonthTotal={userSettings.current_month_total}
              previousMonthTotal={userSettings.previous_month_total}
              showBalanceDialog={showBalanceDialog}
              setShowBalanceDialog={setShowBalanceDialog}
              tempBalance={tempBalance}
              setTempBalance={setTempBalance}
              handleEditBalance={handleEditBalance}
            />
          </TabsContent>
          
          <TabsContent value="expenses">
            <Expenses expenses={expenses} />
          </TabsContent>
          
          <TabsContent value="insights">
            <Insights savingsHistory={savingsHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;