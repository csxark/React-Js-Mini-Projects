import { useMemo, useState } from 'react';
import { Edit, Trash2, Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate, formatCurrency, getCategoryColor } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';

export default function ExpenseList({ expenses = [], onEditExpense, onDeleteExpense }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  
  // Extract unique categories from expenses
  const categories = useMemo(() => {
    const uniqueCategories = new Set(expenses.map(expense => expense.category));
    return Array.from(uniqueCategories);
  }, [expenses]);
  
  // Filter expenses based on search term and category
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      // Category filter
      if (categoryFilter && expense.category !== categoryFilter) {
        return false;
      }
      
      // Search filter - check if search term is in description
      if (searchTerm && !expense.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [expenses, searchTerm, categoryFilter]);
  
  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };
  
  const handleConfirmDelete = () => {
    if (deleteId) {
      onDeleteExpense(deleteId);
      setDeleteId(null);
    }
  };
  
  const handleCancelDelete = () => {
    setDeleteId(null);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-[180px]">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="All Categories" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-lg border">
        <div className="grid grid-cols-[1fr_auto_auto] items-center p-4 font-medium border-b bg-muted/50">
          <div>Expense</div>
          <div className="text-right mr-12">Amount</div>
          <div className="text-center">Actions</div>
        </div>
        
        <div className="divide-y">
          <AnimatePresence>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-[1fr_auto_auto] items-center p-4 gap-4"
                >
                  <div className="min-w-0">
                    <p className="font-medium truncate">{expense.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className={`w-2 h-2 rounded-full ${getCategoryColor(expense.category)}`} />
                      <span>{expense.category}</span>
                      <span>•</span>
                      <span>{formatDate(expense.date, 'MMM dd, yyyy')}</span>
                    </div>
                    {expense.notes && (
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {expense.notes}
                      </p>
                    )}
                  </div>
                  <div className="font-semibold text-right mr-4">
                    {formatCurrency(expense.amount)}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditExpense(expense)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(expense.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No expenses found.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <AlertDialog open={deleteId !== null} onOpenChange={handleCancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the expense.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}