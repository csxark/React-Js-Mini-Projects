import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, DollarSign, CalendarCheck, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatCurrency, calculateSavingsProgress, getProgressColor, generateSavingsMotivation } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function SavingsOverview({ savingsData }) {
  const [showMotivation, setShowMotivation] = useState(false);
  
  const {
    currentBalance = 10250.75,
    minimumBalance = 1000,
    monthlySavingsTarget = 1500,
    actualMonthlySavings = 1125.50,
    totalSaved = 12345.67,
    savingsStreak = 4,
  } = savingsData || {};
  
  const savingsProgress = calculateSavingsProgress(actualMonthlySavings, monthlySavingsTarget);
  const progressBarColor = getProgressColor(savingsProgress);
  const isTargetMet = actualMonthlySavings >= monthlySavingsTarget;
  
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Current Balance Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Current Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-3xl font-bold">{formatCurrency(currentBalance)}</p>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="px-1.5 py-0 text-xs font-medium">
                  <DollarSign className="mr-1 h-3 w-3" />
                  <span>Minimum: {formatCurrency(minimumBalance)}</span>
                </Badge>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Savings Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Monthly Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <p className="text-3xl font-bold">{formatCurrency(actualMonthlySavings)}</p>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">
                    Target: {formatCurrency(monthlySavingsTarget)}
                  </span>
                </div>
              </div>
              
              <div className="h-12 w-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: isTargetMet ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}
              >
                {isTargetMet ? (
                  <ArrowUp className="h-6 w-6 text-emerald-500" />
                ) : (
                  <ArrowDown className="h-6 w-6 text-rose-500" />
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{savingsProgress.toFixed(0)}%</span>
              </div>
              <Progress 
                value={savingsProgress} 
                className="h-2" 
                indicatorClassName={progressBarColor}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Savings Card */}
      <Card 
        className="relative overflow-hidden cursor-pointer"
        onMouseEnter={() => setShowMotivation(true)}
        onMouseLeave={() => setShowMotivation(false)}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Saved
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            <motion.div 
              className="flex items-end justify-between"
              initial={false}
              animate={{ opacity: showMotivation ? 0 : 1 }}
            >
              <div className="space-y-1">
                <p className="text-3xl font-bold">{formatCurrency(totalSaved)}</p>
                <div className="flex items-center gap-1">
                  <Badge className="bg-emerald-500">
                    <CalendarCheck className="mr-1 h-3 w-3" />
                    <span>{savingsStreak} month streak!</span>
                  </Badge>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
            </motion.div>

            {showMotivation && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-card px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-center font-medium text-lg">
                  {generateSavingsMotivation()}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </section>
  );
}