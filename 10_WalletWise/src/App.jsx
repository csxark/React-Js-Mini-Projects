import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import QuickActions from './components/layout/QuickActions';
import Dashboard from './components/dashboard/Dashboard';
import Expenses from './components/expenses/Expenses';
import Insights from './components/insights/Insights';
import Challenges from './components/challenges/Challenges';
import PerkAlert from './components/layout/PerkAlert';
import ExpenseAlert from './components/layout/ExpenseAlert';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Auth from './auth/Auth';
import { getUserSettings, updateUserSettings, getUserExpenses, addExpense, getUserSavingsHistory } from './services/databaseServce';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for initial state
const initialExpense = {
  id: null,
  description: '',
  amount: 0,
  category: '',
  date: new Date().toISOString().slice(0, 10)
};

const DEFAULT_USER_SETTINGS = {
  balance: 0,
  savings: 0,
  goal_progress: 0,
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
  const [newExpense, setNewExpense] = useState(initialExpense);
  
  // Show perk alert if spending less
  const showPerkAlert = userSettings && userSettings.current_month_total < userSettings.previous_month_total;

  // Load user data when authenticated
  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
          // Load user settings
          const settings = await getUserSettings(user.id);
          if (settings) {
            setUserSettings(settings);
          } else {
            // Create default settings if none exist
            const newSettings = await updateUserSettings(user.id, DEFAULT_USER_SETTINGS);
            setUserSettings(newSettings || DEFAULT_USER_SETTINGS);
          }
          
          // Load expenses
          const userExpenses = await getUserExpenses(user.id);
          setExpenses(userExpenses || []);
          
          // Load savings history
          const history = await getUserSavingsHistory(user.id);
          setSavingsHistory(history || []);
        } catch (error) {
          console.error('Error loading user data:', error);
          // Set default values in case of error
          setUserSettings(DEFAULT_USER_SETTINGS);
        }
      }
    };
    
    loadUserData();
  }, [user]);

  // Edit balance handler
  const handleEditBalance = async () => {
    if (!tempBalance || !user) return;
    
    try {
      const updatedSettings = await updateUserSettings(user.id, {
        ...userSettings,
        balance: parseFloat(tempBalance)
      });
      
      setUserSettings({
        ...userSettings,
        balance: updatedSettings?.balance || parseFloat(tempBalance)
      });
      
      setShowBalanceDialog(false);
      setTempBalance('');
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  // Set minimum balance handler
  const handleSetMinBalance = async () => {
    if (!tempMinBalance || !user) return;
    
    try {
      const updatedSettings = await updateUserSettings(user.id, {
        ...userSettings,
        min_monthly_balance: parseFloat(tempMinBalance)
      });
      
      setUserSettings({
        ...userSettings,
        min_monthly_balance: updatedSettings?.min_monthly_balance || parseFloat(tempMinBalance)
      });
      
      setShowMinBalanceDialog(false);
      setTempMinBalance('');
    } catch (error) {
      console.error('Error updating minimum balance:', error);
    }
  };

  // Add expense handler
  const handleAddExpense = async () => {
    if (!expenseAmount || !expenseCategory || !user || !userSettings) return;
    
    try {
      const amount = parseFloat(expenseAmount);
      
      const expenseData = {
        description: expenseDescription || 'Expense',
        amount: amount,
        category: expenseCategory,
        date: new Date().toISOString().slice(0, 10)
      };
      
      // Add expense to database
      const addedExpense = await addExpense(user.id, expenseData);
      
      if (!addedExpense) {
        throw new Error('Failed to add expense');
      }
      
      // Calculate new values
      const newBalance = (userSettings.balance || 0) - amount;
      const newMonthTotal = (userSettings.current_month_total || 0) + amount;
      
      // Update user settings in database
      const updatedSettings = await updateUserSettings(user.id, {
        ...userSettings,
        balance: newBalance,
        current_month_total: newMonthTotal
      });
      
      // Update state
      setUserSettings(prev => ({
        ...prev,
        balance: updatedSettings?.balance || newBalance,
        current_month_total: updatedSettings?.current_month_total || newMonthTotal
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
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard 
              balance={userSettings.balance}
              savings={userSettings.savings}
              goalProgress={userSettings.goal_progress}
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
          
          <TabsContent value="challenges">
            <Challenges />
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