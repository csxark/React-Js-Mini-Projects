import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FilterX, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import ExpenseList from '@/components/expenses/ExpenseList';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  addExpense, 
  getExpenses, 
  updateExpense, 
  deleteExpense, 
  getCurrentUser 
} from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export default function ExpensesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(id === 'new');
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        setIsLoading(true);
        
        // Get current user
        const { user } = await getCurrentUser();
        setCurrentUser(user);
        
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        // Get user expenses
        const { expenses: userExpenses } = await getExpenses(user.id);
        setExpenses(userExpenses || []);
      } catch (error) {
        console.error('Error loading expenses:', error);
        toast({
          variant: 'destructive',
          title: 'Error loading expenses',
          description: 'There was a problem loading your expenses.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadExpenses();
  }, [toast]);
  
  // For demonstration, using mock expenses if none exist yet
  const mockExpenses = [
    {
      id: '1',
      description: 'Grocery Shopping',
      amount: 78.94,
      category: 'food',
      date: '2023-04-15',
      user_id: currentUser?.id,
    },
    {
      id: '2',
      description: 'Electric Bill',
      amount: 120.50,
      category: 'utilities',
      date: '2023-04-12',
      user_id: currentUser?.id,
    },
    {
      id: '3',
      description: 'Movie Night',
      amount: 45.00,
      category: 'entertainment',
      date: '2023-04-10',
      user_id: currentUser?.id,
    },
    {
      id: '4',
      description: 'Gas',
      amount: 35.75,
      category: 'transportation',
      date: '2023-04-09',
      user_id: currentUser?.id,
    },
    {
      id: '5',
      description: 'Dinner Out',
      amount: 65.30,
      category: 'food',
      date: '2023-04-07',
      user_id: currentUser?.id,
    },
  ];
  
  const displayedExpenses = expenses.length > 0 ? expenses : mockExpenses;
  
  const handleOpenForm = () => {
    setIsEditing(false);
    setCurrentExpense(null);
    setIsFormOpen(true);
    navigate('/expenses/new');
  };
  
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setIsEditing(false);
    setCurrentExpense(null);
    navigate('/expenses');
  };
  
  const handleEditExpense = (expense) => {
    setCurrentExpense(expense);
    setIsEditing(true);
    setIsFormOpen(true);
  };
  
  const handleAddExpense = async (formData) => {
    if (!currentUser) {
      toast({
        variant: 'destructive',
        title: 'Authentication required',
        description: 'You must be logged in to add expenses.',
      });
      return;
    }
    
    const newExpense = {
      ...formData,
      user_id: currentUser.id,
    };
    
    const { data, error } = await addExpense(newExpense);
    
    if (error) {
      throw new Error(error.message);
    }
    
    // Update local state
    setExpenses([data[0], ...expenses]);
    handleCloseForm();
  };
  
  const handleUpdateExpense = async (formData) => {
    if (!currentExpense || !currentUser) return;
    
    const { data, error } = await updateExpense(currentExpense.id, formData);
    
    if (error) {
      throw new Error(error.message);
    }
    
    // Update local state
    setExpenses(expenses.map(exp => 
      exp.id === currentExpense.id ? { ...exp, ...formData } : exp
    ));
    handleCloseForm();
  };
  
  const handleDeleteExpense = async (id) => {
    const { error } = await deleteExpense(id);
    
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error deleting expense',
        description: error.message,
      });
      return;
    }
    
    // Update local state
    setExpenses(expenses.filter(exp => exp.id !== id));
    
    toast({
      title: 'Expense deleted',
      description: 'The expense has been deleted successfully.',
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">
            Track and manage your spending
          </p>
        </div>
        <Button onClick={handleOpenForm}>
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      </div>
      
      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : (
            <>
              {displayedExpenses.length === 0 ? (
                <div className="text-center py-12">
                  <FilterX className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No expenses found</h3>
                  <p className="text-muted-foreground mb-6">
                    Start tracking your expenses to see them here.
                  </p>
                  <Button onClick={handleOpenForm}>
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Expense
                  </Button>
                </div>
              ) : (
                <ExpenseList 
                  expenses={displayedExpenses}
                  onEditExpense={handleEditExpense}
                  onDeleteExpense={handleDeleteExpense}
                />
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="calendar">
          <div className="text-center py-12 border rounded-md">
            <p className="text-muted-foreground">
              Calendar view coming soon!
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Expense' : 'Add New Expense'}
            </DialogTitle>
          </DialogHeader>
          <ExpenseForm
            onSubmit={isEditing ? handleUpdateExpense : handleAddExpense}
            initialValues={currentExpense}
            isEditing={isEditing}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}