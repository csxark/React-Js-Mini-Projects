import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, PencilIcon, Trash2, Check, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { getExpenseCategories, getCategoryColor } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function CategoriesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ label: '', value: '' });
  const [categories, setCategories] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editValue, setEditValue] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    // Load categories
    setIsLoading(true);
    setTimeout(() => {
      setCategories(getExpenseCategories());
      setIsLoading(false);
    }, 500);
  }, []);
  
  const handleAddCategory = () => {
    if (!newCategory.label.trim() || !newCategory.value.trim()) {
      toast({
        variant: 'destructive',
        title: 'Invalid category',
        description: 'Please provide both a name and a key for the category.',
      });
      return;
    }
    
    // Validate category doesn't already exist
    if (categories.some(cat => 
      cat.value === newCategory.value || 
      cat.label.toLowerCase() === newCategory.label.toLowerCase()
    )) {
      toast({
        variant: 'destructive',
        title: 'Category exists',
        description: 'A category with this name or key already exists.',
      });
      return;
    }
    
    // Add category
    setCategories([...categories, { ...newCategory, icon: 'Tag' }]);
    setNewCategory({ label: '', value: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: 'Category added',
      description: `The category "${newCategory.label}" has been added successfully.`,
    });
  };
  
  const handleDeleteCategory = () => {
    if (!categoryToDelete) return;
    
    // Delete category
    setCategories(categories.filter(cat => cat.value !== categoryToDelete));
    setCategoryToDelete(null);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: 'Category deleted',
      description: 'The category has been deleted successfully.',
    });
  };
  
  const startEditCategory = (category) => {
    setEditingCategory(category.value);
    setEditValue(category.label);
  };
  
  const cancelEditCategory = () => {
    setEditingCategory(null);
    setEditValue('');
  };
  
  const saveEditCategory = (categoryValue) => {
    if (!editValue.trim()) {
      toast({
        variant: 'destructive',
        title: 'Invalid category name',
        description: 'Category name cannot be empty.',
      });
      return;
    }
    
    // Check if name already exists
    if (categories.some(cat => 
      cat.value !== categoryValue && 
      cat.label.toLowerCase() === editValue.toLowerCase()
    )) {
      toast({
        variant: 'destructive',
        title: 'Category exists',
        description: 'A category with this name already exists.',
      });
      return;
    }
    
    // Update category
    setCategories(categories.map(cat => 
      cat.value === categoryValue ? { ...cat, label: editValue } : cat
    ));
    
    setEditingCategory(null);
    setEditValue('');
    
    toast({
      title: 'Category updated',
      description: 'The category has been updated successfully.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage your expense categories
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>
              Categories for tracking your spending
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {categories.filter(cat => !cat.value.includes('income')).map((category) => (
                  <div 
                    key={category.value}
                    className="flex items-center justify-between p-3 rounded-md border"
                  >
                    {editingCategory === category.value ? (
                      <div className="flex-1 flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(category.value)}`}></div>
                        <Input 
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="h-8"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(category.value)}`}></div>
                        <span>{category.label}</span>
                      </div>
                    )}
                    
                    {editingCategory === category.value ? (
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => saveEditCategory(category.value)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={cancelEditCategory}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => startEditCategory(category)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setCategoryToDelete(category.value);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Income Categories</CardTitle>
            <CardDescription>
              Categories for tracking your income sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {/* We can add dedicated income categories later */}
                <div className="flex items-center justify-between p-3 rounded-md border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span>Salary</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-md border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Investments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-md border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span>Side Hustle</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category to organize your expenses.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input 
                id="categoryName" 
                placeholder="e.g., Groceries, Entertainment" 
                value={newCategory.label}
                onChange={(e) => setNewCategory({
                  ...newCategory,
                  label: e.target.value,
                  value: e.target.value.toLowerCase().replace(/\s+/g, '-')
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryKey">Category Key</Label>
              <Input 
                id="categoryKey" 
                placeholder="e.g., groceries, entertainment" 
                value={newCategory.value}
                onChange={(e) => setNewCategory({
                  ...newCategory,
                  value: e.target.value.toLowerCase().replace(/\s+/g, '-')
                })}
              />
              <p className="text-xs text-muted-foreground">
                This is used internally as a unique identifier for the category.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Category Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}