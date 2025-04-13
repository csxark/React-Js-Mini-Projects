// src/utils/categoryUtils.js
import { CreditCard, ShoppingBag, Coffee, Home, Car, Plane, Book, Gift } from 'lucide-react';

// Define categories that map to the database schema
export const categories = [
  { id: 'shopping', name: 'Shopping', icon: <ShoppingBag className="h-4 w-4" />, color: "#10B981" },
  { id: 'food', name: 'Food & Drinks', icon: <Coffee className="h-4 w-4" />, color: "#F59E0B" },
  { id: 'housing', name: 'Housing', icon: <Home className="h-4 w-4" />, color: "#3B82F6" },
  { id: 'transport', name: 'Transport', icon: <Car className="h-4 w-4" />, color: "#8B5CF6" },
  { id: 'travel', name: 'Travel', icon: <Plane className="h-4 w-4" />, color: "#EC4899" },
  { id: 'education', name: 'Education', icon: <Book className="h-4 w-4" />, color: "#6366F1" },
  { id: 'gifts', name: 'Gifts', icon: <Gift className="h-4 w-4" />, color: "#EF4444" },
  { id: 'other', name: 'Other', icon: <CreditCard className="h-4 w-4" />, color: "#6B7280" }
];

// Function to get category icon
export const getCategoryIcon = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.icon : <CreditCard className="h-4 w-4" />;
};

export const getCategoryName = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : "Other";
};

export const getCategoryColor = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.color : "#6B7280";
};

// Calculate category totals for charts
export const getCategoryData = (expenses) => {
  const categoryTotals = {};
  
  categories.forEach(cat => {
    categoryTotals[cat.id] = 0;
  });
  
  expenses.forEach(expense => {
    if (categoryTotals[expense.category] !== undefined) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals.other += expense.amount;
    }
  });
  
  return Object.keys(categoryTotals)
    .map(key => ({
      name: getCategoryName(key),
      value: categoryTotals[key],
      color: getCategoryColor(key)
    }))
    .filter(item => item.value > 0);
};