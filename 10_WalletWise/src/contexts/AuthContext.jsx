import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { registerUser, findUserByUsername } from '../services/databaseServce';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session and set up auth state listener
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
          // Get additional user data from our database
          const userData = await findUserByUsername(session.user.email.split('@')[0]);
          setUser({ ...session.user, ...userData });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const userData = await findUserByUsername(session.user.email.split('@')[0]);
          setUser({ ...session.user, ...userData });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const login = async (username, password) => {
    try {
      // Construct email if not provided
      const email = username.includes('@') ? username : `${username}@walletwise.com`;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;

      // Get additional user data
      const userData = await findUserByUsername(email.split('@')[0]);
      setUser({ ...data.user, ...userData });

      return data;
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { username, email, password, name, savings_target } = userData;
      
      // Register user in both auth and database
      const registeredData = await registerUser({
        email: email || `${username}@walletwise.com`,
        password,
        name: name || username,
        savings_target: parseFloat(savings_target) || 0
      });

      // Auto login after registration
      await login(username, password);
      
      return registeredData;
    } catch (error) {
      console.error('Error in register:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
