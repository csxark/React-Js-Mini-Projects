import { motion } from 'framer-motion';
import { Target, Calendar, TrendingUp, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, formatDate, calculateSavingsProgress } from '@/lib/utils';

export default function SavingsGoalTracker({ goals = [], onAddGoal }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Savings Goals</CardTitle>
          <CardDescription>Track progress towards your financial targets</CardDescription>
        </div>
        <Button size="sm" onClick={onAddGoal}>
          <Plus className="mr-1 h-4 w-4" />
          New Goal
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <SavingsGoalItem key={goal.id} goal={goal} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Target className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-muted-foreground max-w-xs">
                You haven't set any savings goals yet. Create your first goal to start tracking your progress.
              </p>
            </div>
          )}
        </div>
      </CardContent>
      {goals.length > 0 && (
        <CardFooter className="bg-muted/50 px-6 py-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {goals.length} active savings goal{goals.length !== 1 ? 's' : ''}
            </span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

function SavingsGoalItem({ goal }) {
  const {
    title,
    targetAmount,
    currentAmount,
    targetDate,
    category,
  } = goal;

  const progress = calculateSavingsProgress(currentAmount, targetAmount);
  const remaining = targetAmount - currentAmount;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border rounded-lg p-4 space-y-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            <span>Target date: {formatDate(targetDate)}</span>
          </div>
        </div>
        <div className="bg-muted rounded-full px-3 py-1 text-xs font-medium">
          {category}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-1 text-sm">
          <span>{formatCurrency(currentAmount)}</span>
          <span>{formatCurrency(targetAmount)}</span>
        </div>
      </div>
      
      <div className="pt-2 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{formatCurrency(remaining)}</span> left to save
        </div>
        <Button variant="outline" size="sm">
          Add Funds
        </Button>
      </div>
    </motion.div>
  );
}