import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO, isValid } from 'date-fns';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString, formatStr = 'PPP') => {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  if (!isValid(date)) return 'Invalid date';
  return format(date, formatStr);
};

export const calculateSavingsProgress = (current, target) => {
  if (!target || target === 0) return 0;
  const progress = (current / target) * 100;
  return Math.min(Math.max(progress, 0), 100);
};

export const getProgressColor = (progress) => {
  if (progress >= 75) return 'bg-emerald-500';
  if (progress >= 50) return 'bg-emerald-400';
  if (progress >= 25) return 'bg-amber-400';
  return 'bg-rose-400';
};

export const groupExpensesByCategory = (expenses) => {
  return expenses.reduce((acc, expense) => {
    const category = expense.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.amount;
    return acc;
  }, {});
};

export const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const getExpenseCategories = () => [
  { value: 'housing', label: 'Housing', icon: 'Home' },
  { value: 'food', label: 'Food & Dining', icon: 'Utensils' },
  { value: 'transportation', label: 'Transportation', icon: 'Car' },
  { value: 'utilities', label: 'Utilities', icon: 'Lightbulb' },
  { value: 'entertainment', label: 'Entertainment', icon: 'Film' },
  { value: 'shopping', label: 'Shopping', icon: 'ShoppingBag' },
  { value: 'healthcare', label: 'Healthcare', icon: 'Stethoscope' },
  { value: 'education', label: 'Education', icon: 'GraduationCap' },
  { value: 'personal', label: 'Personal', icon: 'User' },
  { value: 'travel', label: 'Travel', icon: 'Plane' },
  { value: 'investments', label: 'Investments', icon: 'TrendingUp' },
  { value: 'misc', label: 'Miscellaneous', icon: 'MoreHorizontal' },
];

export const getCategoryColor = (category) => {
  const colors = {
    housing: 'bg-blue-500',
    food: 'bg-green-500',
    transportation: 'bg-yellow-500',
    utilities: 'bg-indigo-500',
    entertainment: 'bg-purple-500',
    shopping: 'bg-pink-500',
    healthcare: 'bg-red-500',
    education: 'bg-cyan-500',
    personal: 'bg-teal-500',
    travel: 'bg-amber-500',
    investments: 'bg-emerald-500',
    misc: 'bg-gray-500',
  };
  return colors[category] || 'bg-gray-500';
};

export const generateSavingsMotivation = () => {
  const motivations = [
    "Great job! Keep the momentum going!",
    "You're on track to financial freedom!",
    "Every dollar saved is a step toward your goals!",
    "Small steps today, big rewards tomorrow!",
    "Consistency is key to building wealth!",
    "Your future self will thank you for saving today!",
    "Building healthy financial habits pays off!",
    "You're making smart money moves!",
    "Financial independence is within reach!",
    "Your savings journey is looking bright!"
  ];
  
  return motivations[Math.floor(Math.random() * motivations.length)];
};