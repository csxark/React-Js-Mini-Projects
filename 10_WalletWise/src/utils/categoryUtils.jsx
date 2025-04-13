// src/utils/categoryUtils.js
import { categories } from '../data/mockData';
import { CreditCard } from 'lucide-react';

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
  return category ? category.color : "#6C757D";
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
  
  return Object.keys(categoryTotals).map(key => ({
    name: categories.find(cat => cat.id === key)?.name || key,
    value: categoryTotals[key],
    color: categories.find(cat => cat.id === key)?.color || "#6C757D"
  })).filter(item => item.value > 0);
};