import { supabase } from '../lib/supabase';

// Expenses
export const getUserExpenses = async (userId) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const addExpense = async (userId, expenseData) => {
  const { data, error } = await supabase
    .from('expenses')
    .insert([{ ...expenseData, user_id: userId }])
    .select();
  
  if (error) throw error;
  return data[0];
};

// User settings
export const getUserSettings = async (userId) => {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching user settings:', error);
    return null;
  }
  
  // If no settings exist, create default settings
  if (!data) {
    return createDefaultUserSettings(userId);
  }
  
  return data;
};

export const createDefaultUserSettings = async (userId) => {
  const defaultSettings = {
    user_id: userId,
    balance: 10000,
    savings: 0,
    min_monthly_balance: 5000,
    goal_progress: 20,
    current_month_total: 3000,
    previous_month_total: 4500
  };
  
  const { data, error } = await supabase
    .from('user_settings')
    .upsert([defaultSettings])
    .select()
    .maybeSingle();
  
  if (error) {
    console.error('Error creating default settings:', error);
    return defaultSettings; // Return default even if save fails
  }
  
  return data || defaultSettings;
};

export const updateUserSettings = async (userId, settings) => {
  const { data, error } = await supabase
    .from('user_settings')
    .update(settings)
    .eq('user_id', userId)
    .select()
    .maybeSingle();
  
  if (error) {
    console.error('Error updating user settings:', error);
    return settings; // Return the attempted settings if update fails
  }
  
  return data || settings;
};

// Savings history
export const getUserSavingsHistory = async (userId) => {
  const { data, error } = await supabase
    .from('savings_history')
    .select('*')
    .eq('user_id', userId)
    .order('month_num', { ascending: true });
  
  if (error) throw error;
  
  // If no history exists, create default history
  if (data.length === 0) {
    return createDefaultSavingsHistory(userId);
  }
  
  return data;
};

export const createDefaultSavingsHistory = async (userId) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  const history = [];
  for (let i = 0; i < 6; i++) {
    const monthIndex = (currentMonth - 5 + i + 12) % 12;
    history.push({
      user_id: userId,
      month: months[monthIndex],
      month_num: monthIndex,
      amount: 1000 + Math.floor(Math.random() * 4000)
    });
  }
  
  const { data, error } = await supabase
    .from('savings_history')
    .insert(history)
    .select();
  
  if (error) throw error;
  return data;
};
