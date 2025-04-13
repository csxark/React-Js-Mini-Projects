// src/data/mockData.js
import { Utensils, ShoppingBag, Home, Car, Smartphone, Film, CreditCard } from 'lucide-react';

export const categories = [
  { id: "food", name: "Food & Drink", icon: <Utensils className="h-4 w-4" />, color: "#FF6B6B" },
  { id: "shopping", name: "Shopping", icon: <ShoppingBag className="h-4 w-4" />, color: "#4ECDC4" },
  { id: "housing", name: "Housing", icon: <Home className="h-4 w-4" />, color: "#FFD166" },
  { id: "transportation", name: "Transportation", icon: <Car className="h-4 w-4" />, color: "#06D6A0" },
  { id: "utilities", name: "Utilities", icon: <Smartphone className="h-4 w-4" />, color: "#118AB2" },
  { id: "entertainment", name: "Entertainment", icon: <Film className="h-4 w-4" />, color: "#073B4C" },
  { id: "other", name: "Other", icon: <CreditCard className="h-4 w-4" />, color: "#6C757D" },
];

export const mockExpenses = [
  { id: 1, date: "2025-04-10", amount: 25, description: "Coffee shop", category: "food" },
  { id: 2, date: "2025-04-09", amount: 45, description: "Dinner with friends", category: "food" },
  { id: 3, date: "2025-04-08", amount: 60, description: "Gas", category: "transportation" },
  { id: 4, date: "2025-04-07", amount: 15, description: "Movie ticket", category: "entertainment" },
  { id: 5, date: "2025-04-06", amount: 35, description: "Mobile bill", category: "utilities" },
  { id: 6, date: "2025-04-05", amount: 120, description: "Shoes", category: "shopping" },
];

export const challenges = [
  { id: 1, title: 'Save ₹20,000 this month', progress: 45 },
  { id: 2, title: '7-day expense tracking', progress: 71 },
  { id: 3, title: 'Cut food expenses by 15%', progress: 60 },
];

export const savingsHistory = [
  { month: 'Jan', amount: 5000 },
  { month: 'Feb', amount: 7500 },
  { month: 'Mar', amount: 9000 },
  { month: 'Apr', amount: 13500 },
  { month: 'May', amount: 12000 },
  { month: 'Jun', amount: 18000 },
  { month: 'Jul', amount: 22000 },
  { month: 'Aug', amount: 25000 },
];

export const savingsGoals = [
  { id: 1, title: 'Emergency Fund', target: 50000, current: 20000 },
  { id: 2, title: 'Vacation Fund', target: 30000, current: 15000 },
  { id: 3, title: 'New Car', target: 100000, current: 50000 },
];

