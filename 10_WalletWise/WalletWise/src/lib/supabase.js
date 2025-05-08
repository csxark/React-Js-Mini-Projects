import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with public env variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase credentials missing. Make sure to connect to Supabase!'
  );
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Auth functions
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user, error };
};

// Profile functions
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { profile: data, error };
};

export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};

// Expense functions
export const addExpense = async (expenseData) => {
  const { data, error } = await supabase
    .from('expenses')
    .insert([expenseData])
    .select()
    .single();
  return { data, error };
};

export const getExpenses = async (userId, options = {}) => {
  let query = supabase
    .from('expenses')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  
  if (options.startDate) {
    query = query.gte('date', options.startDate);
  }
  
  if (options.endDate) {
    query = query.lte('date', options.endDate);
  }
  
  if (options.category) {
    query = query.eq('category', options.category);
  }
  
  const { data, error } = await query;
  return { expenses: data, error };
};

export const updateExpense = async (expenseId, updates) => {
  const { data, error } = await supabase
    .from('expenses')
    .update(updates)
    .eq('id', expenseId)
    .select()
    .single();
  return { data, error };
};

export const deleteExpense = async (expenseId) => {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', expenseId);
  return { error };
};

// Savings Goals functions
export const addSavingsGoal = async (goalData) => {
  const { data, error } = await supabase
    .from('savings_goals')
    .insert([goalData])
    .select()
    .single();
  return { data, error };
};

export const getSavingsGoals = async (userId) => {
  const { data, error } = await supabase
    .from('savings_goals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { goals: data, error };
};

export const updateSavingsGoal = async (goalId, updates) => {
  const { data, error } = await supabase
    .from('savings_goals')
    .update(updates)
    .eq('id', goalId)
    .select()
    .single();
  return { data, error };
};

export const deleteSavingsGoal = async (goalId) => {
  const { error } = await supabase
    .from('savings_goals')
    .delete()
    .eq('id', goalId);
  return { error };
};

// Financial Metrics functions
export const getFinancialMetrics = async (userId, options = {}) => {
  let query = supabase
    .from('financial_metrics')
    .select('*')
    .eq('user_id', userId);
    
  if (options.year) {
    query = query.eq('year', options.year);
  }
  
  if (options.month) {
    query = query.eq('month', options.month);
  }
  
  if (options.metricType) {
    query = query.eq('metric_type', options.metricType);
  }
  
  const { data, error } = await query;
  return { metrics: data, error };
};

export const updateFinancialMetrics = async (userId, metricData) => {
  const { data, error } = await supabase
    .from('financial_metrics')
    .upsert([{
      user_id: userId,
      ...metricData
    }])
    .select()
    .single();
  return { data, error };
};

// Get monthly savings analysis
export const getMonthlySavings = async (userId, year) => {
  const { data, error } = await supabase
    .rpc('get_monthly_savings', {
      user_id_param: userId,
      year_param: year
    });
  return { monthlySavings: data, error };
};