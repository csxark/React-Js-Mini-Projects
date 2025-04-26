import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    savings_target: 0
  });
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    setError('');
    
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      
      if (!formData.name.trim()) {
        setError('Name is required');
        return false;
      }
    }
    
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    
    if (!isLogin && formData.savings_target < 0) {
      setError('Savings target cannot be negative');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (isLogin) {
        await login(formData.username, formData.password);
      } else {
        // For registration, construct proper user data object
        const userData = {
          username: formData.username,
          email: formData.email || `${formData.username}@walletwise.com`,
          password: formData.password,
          name: formData.name,
          savings_target: parseFloat(formData.savings_target)
        };
        await register(userData);
      }
    } catch (error) {
      setError(error.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {isLogin ? 'Login to Your Account' : 'Create a New Account'}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                  placeholder="your@email.com"
                />
              </div>
            </>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
              placeholder="Username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
              placeholder="••••••••"
            />
          </div>
          
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Monthly Savings Target (₹)
                </label>
                <input
                  type="number"
                  name="savings_target"
                  value={formData.savings_target}
                  onChange={handleChange}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>
            </>
          )}
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium transition duration-200"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({
                name: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                savings_target: 0
              });
            }}
            className="text-emerald-400 hover:text-emerald-300 text-sm"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;