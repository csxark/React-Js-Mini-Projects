import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Target, Plus, FilterX } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SavingsGoalForm from '@/components/goals/SavingsGoalForm';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  addSavingsGoal, 
  getSavingsGoals, 
  updateSavingsGoal, 
  deleteSavingsGoal, 
  getCurrentUser 
} from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export default function GoalsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(id === 'new');
  const [isEditing, setIsEditing] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  
  useEffect(() => {
    const loadGoals = async () => {
      try {
        setIsLoading(true);
        
        // Get current user
        const { user } = await getCurrentUser();
        setCurrentUser(user);
        
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        // Get user goals
        const { goals: userGoals } = await getSavingsGoals(user.id);
        setGoals(userGoals || []);
      } catch (error) {
        console.error('Error loading goals:', error);
        toast({
          variant: 'destructive',
          title: 'Error loading goals',
          description: 'There was a problem loading your savings goals.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadGoals();
  }, [toast]);
  
  // For demonstration, using mock goals if none exist yet
  const mockGoals = [
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 5000,
      targetDate: '2023-12-31',
      category: 'emergency',
      priority: 5,
      user_id: currentUser?.id,
    },
    {
      id: '2',
      title: 'Dream Vacation',
      targetAmount: 3000,
      currentAmount: 1200,
      targetDate: '2023-08-15',
      category: 'travel',
      priority: 3,
      user_id: currentUser?.id,
    },
    {
      id: '3',
      title: 'New Laptop',
      targetAmount: 2000,
      currentAmount: 800,
      targetDate: '2023-10-01',
      category: 'electronics',
      priority: 2,
      user_id: currentUser?.id,
    },
  ];
  
  const displayedGoals = goals.length > 0 ? goals : mockGoals;
  
  const handleOpenForm = () => {
    setIsEditing(false);
    setCurrentGoal(null);
    setIsFormOpen(true);
    navigate('/goals/new');
  };
  
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setIsEditing(false);
    setCurrentGoal(null);
    navigate('/goals');
  };
  
  const handleEditGoal = (goal) => {
    setCurrentGoal(goal);
    setIsEditing(true);
    setIsFormOpen(true);
  };
  
  const handleAddGoal = async (formData) => {
    if (!currentUser) {
      toast({
        variant: 'destructive',
        title: 'Authentication required',
        description: 'You must be logged in to add savings goals.',
      });
      return;
    }
    
    const newGoal = {
      ...formData,
      user_id: currentUser.id,
    };
    
    const { data, error } = await addSavingsGoal(newGoal);
    
    if (error) {
      throw new Error(error.message);
    }
    
    // Update local state
    setGoals([data[0], ...goals]);
    handleCloseForm();
  };
  
  const handleUpdateGoal = async (formData) => {
    if (!currentGoal || !currentUser) return;
    
    const { data, error } = await updateSavingsGoal(currentGoal.id, formData);
    
    if (error) {
      throw new Error(error.message);
    }
    
    // Update local state
    setGoals(goals.map(goal => 
      goal.id === currentGoal.id ? { ...goal, ...formData } : goal
    ));
    handleCloseForm();
  };
  
  const handleDeleteGoal = async (id) => {
    const { error } = await deleteSavingsGoal(id);
    
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error deleting goal',
        description: error.message,
      });
      return;
    }
    
    // Update local state
    setGoals(goals.filter(goal => goal.id !== id));
    
    toast({
      title: 'Goal deleted',
      description: 'The savings goal has been deleted successfully.',
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
          <p className="text-muted-foreground">
            Set and track your financial targets
          </p>
        </div>
        <Button onClick={handleOpenForm}>
          <Plus className="mr-2 h-4 w-4" /> Add Goal
        </Button>
      </div>
      
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : (
        <>
          {displayedGoals.length === 0 ? (
            <div className="text-center py-12">
              <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No savings goals found</h3>
              <p className="text-muted-foreground mb-6">
                Start setting savings goals to track your financial progress.
              </p>
              <Button onClick={handleOpenForm}>
                <Plus className="mr-2 h-4 w-4" /> Create Your First Goal
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayedGoals.map((goal) => (
                <GoalCard 
                  key={goal.id} 
                  goal={goal} 
                  onEdit={() => handleEditGoal(goal)}
                  onDelete={() => handleDeleteGoal(goal.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
      
      <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Savings Goal' : 'Add New Savings Goal'}
            </DialogTitle>
          </DialogHeader>
          <SavingsGoalForm
            onSubmit={isEditing ? handleUpdateGoal : handleAddGoal}
            initialValues={currentGoal}
            isEditing={isEditing}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function GoalCard({ goal, onEdit, onDelete }) {
  const { title, targetAmount, currentAmount, targetDate, category, priority } = goal;
  
  const progress = Math.round((currentAmount / targetAmount) * 100);
  const formattedTargetDate = new Date(targetDate).toLocaleDateString();
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 5: return "bg-rose-500";
      case 4: return "bg-orange-500";
      case 3: return "bg-amber-500";
      case 2: return "bg-emerald-500";
      case 1: 
      default: return "bg-blue-500";
    }
  };
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'emergency': return "🛡️";
      case 'retirement': return "👵";
      case 'travel': return "✈️";
      case 'home': return "🏠";
      case 'vehicle': return "🚗";
      case 'education': return "🎓";
      case 'wedding': return "💍";
      default: return "💰";
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border rounded-lg overflow-hidden bg-card shadow-sm"
    >
      <div className={`h-2 ${getPriorityColor(priority)}`}></div>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="text-2xl" aria-hidden="true">{getCategoryIcon(category)}</div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${getPriorityColor(priority)}`} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Current</p>
              <p className="font-semibold">${currentAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Target</p>
              <p className="font-semibold">${targetAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Category</p>
              <p className="capitalize">{category}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Target Date</p>
              <p>{formattedTargetDate}</p>
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
              Edit
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-rose-500 hover:text-rose-700" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}