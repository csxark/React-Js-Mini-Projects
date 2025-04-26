import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

/**
 * Register a new user in the database
 * @param {Object} userData - User data including email, password, and name
 * @returns {Promise} - Created user data
 */
export const registerUser = async (userData) => {
  try {
    const { email, password, name, savings_target } = userData;
    
    // First register with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          savings_target: savings_target || 0
        }
      }
    });
    
    if (authError) throw authError;

    // Wait for session to be established
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;

    // Get access token
    const accessToken = session?.access_token;
    if (!accessToken) {
      throw new Error('No access token available');
    }

    // Configure client with access token
    const supabaseClient = supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: session.refresh_token
    });

    const username = email.split('@')[0];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user profile
    const { data, error } = await supabase
      .from('user_credentials')
      .insert([{ 
        id: authData.user.id,
        name, 
        username,
        email,
        password_hash: hashedPassword,
        savings_target: savings_target || 0
      }])
      .select();
    
    if (error) throw error;
    
    // Initialize user balance and savings
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const monthNum = now.getMonth() + 1;
    const year = now.getFullYear();

    await Promise.all([
      supabase
        .from('user_balance')
        .insert([{
          username,
          current_balance: 0,
          min_monthly_balance: 0
        }]),
      supabase
        .from('savings')
        .insert([{
          username,
          month,
          month_num: monthNum,
          year,
          savings_amount: 0,
          monthly_balance: 0,
          expenses_count: 0
        }])
    ]);
    
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Find user by username
 * @param {string} username - Username
 * @returns {Promise} - User data
 */
export const findUserByUsername = async (username) => {
  try {
    const { data, error } = await supabase
      .from('user_credentials')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
};

/**
 * Get user profile information
 * @param {string} userId - User ID from Supabase Auth
 * @returns {Promise} - User profile data
 */
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_credentials')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

/**
 * Update user profile information
 * @param {string} userId - User ID from Supabase Auth
 * @param {Object} profileData - Updated profile data
 * @returns {Promise} - Updated user data
 */
export const updateUserProfile = async (userId, profileData) => {
  try {
    const { data, error } = await supabase
      .from('user_credentials')
      .update(profileData)
      .eq('id', userId)
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Get user's current balance
 * @param {string} username - Username
 * @returns {Promise} - Balance data
 */
export const getUserBalance = async (username) => {
  try {
    const { data, error } = await supabase
      .from('user_balance')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user balance:', error);
    throw error;
  }
};

/**
 * Update user's balance
 * @param {string} username - Username
 * @param {number} amount - New balance amount
 * @returns {Promise} - Updated balance data
 */
export const updateUserBalance = async (username, newBalance) => {
  try {
    const { data, error } = await supabase
      .from('user_balance')
      .update({ 
        current_balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('username', username)
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating balance:', error);
    throw error;
  }
};

/**
 * Update user's minimum monthly balance
 * @param {string} username - Username
 * @param {number} minBalance - New minimum monthly balance
 * @returns {Promise} - Updated balance data
 */
export const updateMinMonthlyBalance = async (username, minBalance) => {
  try {
    const { data, error } = await supabase
      .from('user_balance')
      .update({ 
        min_monthly_balance: minBalance,
        updated_at: new Date().toISOString()
      })
      .eq('username', username)
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating minimum balance:', error);
    throw error;
  }
};

/**
 * Add a new expense
 * @param {Object} expenseData - Expense data
 * @returns {Promise} - Created expense data
 */
export const addExpense = async (expenseData) => {
  const { username, category, amount, description, date } = expenseData;

  try {
    // Start a transaction by getting current balance
    const { data: balanceData, error: balanceError } = await supabase
      .from('user_balance')
      .select('current_balance')
      .eq('username', username)
      .single();
    
    if (balanceError) throw balanceError;

    const newBalance = balanceData.current_balance - amount;
    const now = new Date();

    // Add expense with proper date and time
    const { data: expense, error: expenseError } = await supabase
      .from('expenses')
      .insert([{
        username,
        category,
        amount,
        date: date || now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0]
      }])
      .select()
      .single();
    
    if (expenseError) throw expenseError;

    // Update balance
    const { error: updateError } = await supabase
      .from('user_balance')
      .update({ 
        current_balance: newBalance,
        updated_at: now.toISOString()
      })
      .eq('username', username);
    
    if (updateError) throw updateError;

    // Update monthly savings
    const month = now.toLocaleString('default', { month: 'long' });
    const monthNum = now.getMonth() + 1;
    const year = now.getFullYear();

    const { data: savings, error: savingsError } = await supabase
      .from('savings')
      .select('*')
      .eq('username', username)
      .eq('month_num', monthNum)
      .eq('year', year)
      .single();

    if (savingsError && savingsError.code !== 'PGRST116') { // Not found error
      throw savingsError;
    }

    if (!savings) {
      await supabase
        .from('savings')
        .insert([{
          username,
          month,
          month_num: monthNum,
          year,
          savings_amount: 0,
          monthly_balance: newBalance,
          expenses_count: 1
        }]);
    } else {
      await supabase
        .from('savings')
        .update({
          expenses_count: savings.expenses_count + 1,
          monthly_balance: newBalance,
          updated_at: now.toISOString()
        })
        .eq('id', savings.id);
    }

    return expense;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

/**
 * Get user expenses
 * @param {string} username - Username
 * @param {Object} filters - Optional filters
 * @returns {Promise} - Expenses data
 */
export const getUserExpenses = async (username, filters = {}) => {
  try {
    let query = supabase
      .from('expenses')
      .select('*')
      .eq('username', username);
    
    // Apply filters if provided
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    
    if (filters.startDate) {
      query = query.gte('date', filters.startDate);
    }
    
    if (filters.endDate) {
      query = query.lte('date', filters.endDate);
    }
    
    // Order by date and time
    const { data, error } = await query
      .order('date', { ascending: false })
      .order('time', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user expenses:', error);
    throw error;
  }
};

/**
 * Get user savings data
 * @param {string} username - Username
 * @param {number} year - Optional year filter
 * @returns {Promise} - Savings data
 */
export const getUserSavings = async (username, year = null) => {
  try {
    let query = supabase
      .from('savings')
      .select('*')
      .eq('username', username);
    
    if (year) {
      query = query.eq('year', year);
    }
    
    const { data, error } = await query
      .order('year', { ascending: false })
      .order('month_num', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user savings:', error);
    throw error;
  }
};

/**
 * Update user savings target
 * @param {string} username - Username
 * @param {number} target - New savings target
 * @returns {Promise} - Updated user data
 */
export const updateSavingsTarget = async (username, target) => {
  try {
    const { data, error } = await supabase
      .from('user_credentials')
      .update({ 
        savings_target: target,
        updated_at: new Date().toISOString()
      })
      .eq('username', username)
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating savings target:', error);
    throw error;
  }
};