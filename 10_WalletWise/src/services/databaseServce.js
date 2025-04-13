import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

// User Authentication and Registration
export const registerUser = async (userData) => {
  const { name, email, password } = userData;
  
  // First create auth user to get the UUID
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password
  });

  if (authError) throw authError;
  
  // Use the auth UUID as username
  const username = authData.user.id;

  // Hash password for additional security
  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);
  
  // Insert user credentials
  const { data: userCredentials, error: userError } = await supabase
    .from('user_credentials')
    .insert([{
      name,
      username,
      email,
      password_hash
    }])
    .select();
  
  if (userError) throw userError;
  
  // Initialize user balance
  const { error: balanceError } = await supabase
    .from('user_balance')
    .insert([{
      username,
      current_balance: 0
    }]);
  
  if (balanceError) throw balanceError;
  
  // Initialize default savings history
  await initializeDefaultSavings(username);
  
  return userCredentials[0];
};

// Core expense and savings management functions
export const getUserExpenses = async (username, options = {}) => {
  const { startDate, endDate, category, limit = 50, offset = 0 } = options;
  
  let query = supabase
    .from('expenses')
    .select('*')
    .eq('username', username)
    .order('date', { ascending: false })
    .order('time', { ascending: false });
  
  if (startDate) {
    query = query.gte('date', startDate);
  }
  
  if (endDate) {
    query = query.lte('date', endDate);
  }
  
  if (category) {
    query = query.eq('category', category);
  }

  if (offset > 0) {
    query = query.offset(offset);
  }

  if (limit > 0) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};

export const getExpenseCategories = async (username) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('category')
    .eq('username', username)
    .order('category');
  
  if (error) throw error;
  
  // Extract unique categories
  const categories = [...new Set(data.map(item => item.category))];
  return categories;
};

export const addExpense = async (username, expenseData) => {
  const { data: expense, error: expenseError } = await supabase
    .from('expenses')
    .insert([{ 
      ...expenseData, 
      username,
      time: new Date().toLocaleTimeString(),
      created_at: new Date().toISOString()
    }])
    .select();
  
  if (expenseError) throw expenseError;
  
  // Update user balance
  await updateBalanceAfterExpense(username, expenseData.amount);
  
  // Update monthly savings
  await updateMonthlySavings(username, expenseData.date);
  
  return expense[0];
};

export const updateExpense = async (username, expenseId, updatedData) => {
  // Get current expense to calculate balance difference
  const { data: currentExpense, error: fetchError } = await supabase
    .from('expenses')
    .select('amount, date')
    .eq('id', expenseId)
    .eq('username', username)
    .maybeSingle();
  
  if (fetchError) throw fetchError;
  if (!currentExpense) throw new Error('Expense not found');
  
  // Update expense
  const { data: expense, error: updateError } = await supabase
    .from('expenses')
    .update(updatedData)
    .eq('id', expenseId)
    .eq('username', username)
    .select();
  
  if (updateError) throw updateError;
  
  // If amount changed, update balance
  if (updatedData.amount !== undefined && updatedData.amount !== currentExpense.amount) {
    const amountDifference = currentExpense.amount - updatedData.amount;
    await updateBalanceByDifference(username, amountDifference);
  }
  
  // If date changed, update both months' savings data
  if (updatedData.date !== undefined && updatedData.date !== currentExpense.date) {
    await updateMonthlySavings(username, currentExpense.date);
    await updateMonthlySavings(username, updatedData.date);
  } else if (updatedData.amount !== undefined) {
    // If only amount changed, update the month's savings
    await updateMonthlySavings(username, currentExpense.date);
  }
  
  return expense[0];
};

export const deleteExpense = async (username, expenseId) => {
  // Get expense details first
  const { data: expense, error: fetchError } = await supabase
    .from('expenses')
    .select('*')
    .eq('id', expenseId)
    .eq('username', username)
    .maybeSingle();
  
  if (fetchError) throw fetchError;
  if (!expense) throw new Error('Expense not found');
  
  // Delete the expense
  const { error: deleteError } = await supabase
    .from('expenses')
    .delete()
    .eq('id', expenseId)
    .eq('username', username);
  
  if (deleteError) throw deleteError;
  
  // Add the expense amount back to the balance
  await updateBalanceByDifference(username, expense.amount);
  
  // Update monthly savings
  await updateMonthlySavings(username, expense.date);
  
  return { success: true, deletedExpense: expense };
};

// Balance Management
export const getUserBalance = async (username) => {
  // First ensure user_credentials exists
  const { data: credentials } = await supabase
    .from('user_credentials')
    .select('username')
    .eq('username', username)
    .single();

  if (!credentials) {
    throw new Error('User credentials not found');
  }

  const { data, error } = await supabase
    .from('user_balance')
    .select('current_balance')
    .eq('username', username)
    .maybeSingle();
  
  if (error) throw error;
  return data;
};

const updateUserBalance = async (username, newBalance) => {
  try {
    // Try to get user credentials
    const { data: credentials } = await supabase
      .from('user_credentials')
      .select('username')
      .eq('username', username)
      .single();

    // If no credentials exist, create them
    if (!credentials) {
      // Get user email from auth
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      // Create user credentials
      await supabase.from('user_credentials').insert([{
        username: user.id,
        name: user.email.split('@')[0],
        email: user.email,
        password_hash: 'oauth'
      }]);
    }

    // Update or create balance record
    const { data, error } = await supabase
      .from('user_balance')
      .upsert([{
        username,
        current_balance: newBalance,
        updated_at: new Date().toISOString()
      }])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error in updateUserBalance:', error);
    throw error;
  }
};

const updateBalanceAfterExpense = async (username, expenseAmount) => {
  const currentBalance = await getUserBalance(username);
  if (!currentBalance) throw new Error('User balance not found');
  
  const newBalance = currentBalance.current_balance - parseFloat(expenseAmount);
  await updateUserBalance(username, newBalance);
};

const updateBalanceByDifference = async (username, amountDifference) => {
  const currentBalance = await getUserBalance(username);
  if (!currentBalance) throw new Error('User balance not found');
  
  const newBalance = currentBalance.current_balance + parseFloat(amountDifference);
  await updateUserBalance(username, newBalance);
};

// Savings Management
export const getSavingsByMonth = async (username, month, year) => {
  const { data, error } = await supabase
    .from('savings')
    .select('*')
    .eq('username', username)
    .eq('month_num', month)
    .eq('year', year)
    .maybeSingle();
  
  if (error) throw error;
  return data;
};

const initializeDefaultSavings = async (username) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  // Create savings records for the past 6 months
  const savingsRecords = [];
  for (let i = 0; i < 6; i++) {
    const targetDate = new Date(currentYear, currentMonth - i, 1);
    const month = months[targetDate.getMonth()];
    const monthNum = targetDate.getMonth();
    const year = targetDate.getFullYear();
    
    savingsRecords.push({
      username,
      month,
      month_num: monthNum,
      year,
      savings_amount: 0,
      monthly_balance: 0,
      expenses_count: 0
    });
  }
  
  const { error } = await supabase
    .from('savings')
    .upsert(savingsRecords);
  
  if (error) throw error;
  return savingsRecords;
};

const updateMonthlySavings = async (username, dateString) => {
  const expenseDate = new Date(dateString);
  const month = expenseDate.getMonth();
  const year = expenseDate.getFullYear();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Get current balance
  const { data: balanceData, error: balanceError } = await supabase
    .from('user_balance')
    .select('current_balance')
    .eq('username', username)
    .maybeSingle();
  
  if (balanceError) throw balanceError;
  const currentBalance = balanceData?.current_balance || 0;
  
  // Calculate total expenses for the month
  const startOfMonth = new Date(year, month, 1).toISOString().split('T')[0];
  const endOfMonth = new Date(year, month + 1, 0).toISOString().split('T')[0];
  
  const { data: expenses, error: expensesError } = await supabase
    .from('expenses')
    .select('amount')
    .eq('username', username)
    .gte('date', startOfMonth)
    .lte('date', endOfMonth);
  
  if (expensesError) throw expensesError;
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const expensesCount = expenses.length;
  
  // Update or insert savings record
  const { error: updateError } = await supabase
    .from('savings')
    .upsert([{
      username,
      month: months[month],
      month_num: month,
      year,
      savings_amount: currentBalance,
      monthly_balance: currentBalance,
      expenses_count: expensesCount,
      updated_at: new Date()
    }]);
  
  if (updateError) throw updateError;
  
  return {
    month: months[month],
    year,
    savings_amount: currentBalance,
    monthly_balance: currentBalance,
    expenses_count: expensesCount
  };
};

// User Settings Management
export const getUserSettings = async (username) => {
  if (!username) {
    console.error('Username is required for getUserSettings');
    return DEFAULT_USER_SETTINGS;
  }

  try {
    const [balanceResult, savingsDataResult] = await Promise.all([
      getUserBalance(username).catch(() => null),
      getSavingsByMonth(
        username, 
        new Date().getMonth(),
        new Date().getFullYear()
      ).catch(() => null)
    ]);

    return {
      balance: balanceResult?.current_balance || 0,
      savings: savingsDataResult?.savings_amount || 0,
      min_monthly_balance: balanceResult?.min_monthly_balance || 0,
      current_month_total: savingsDataResult?.expenses_total || 0,
      previous_month_total: savingsDataResult?.previous_month_total || 0
    };
  } catch (error) {
    console.error('Error in getUserSettings:', error);
    return {
      balance: 0,
      savings: 0,
      min_monthly_balance: 0,
      current_month_total: 0,
      previous_month_total: 0
    };
  }
};

export const updateUserSettings = async (username, settings) => {
  const { balance, min_monthly_balance, ...otherSettings } = settings;
  
  // Update balance if provided
  if (balance !== undefined) {
    await updateUserBalance(username, balance);
  }

  // Update other settings in user profile
  const { data, error } = await supabase
    .from('user_credentials')
    .update({
      min_monthly_balance,
      ...otherSettings,
      updated_at: new Date()
    })
    .eq('username', username)
    .select();

  if (error) throw error;
  return settings;
};

export const getUserSavingsHistory = async (username) => {
  const { data, error } = await supabase
    .from('savings')
    .select('*')
    .eq('username', username)
    .order('year', { ascending: false })
    .order('month_num', { ascending: false });
  
  if (error) throw error;
  return data;
};
