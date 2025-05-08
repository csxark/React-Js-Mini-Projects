import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Clock, Wallet, Banknote } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { groupExpensesByCategory, calculateTotalExpenses, formatCurrency, getCategoryColor } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function ExpenseInsights({ expenses = [], recentTransactions = [] }) {
  const totalExpenses = useMemo(() => calculateTotalExpenses(expenses), [expenses]);
  
  const categoryData = useMemo(() => {
    const grouped = groupExpensesByCategory(expenses);
    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
    }));
  }, [expenses]);

  const COLORS = ['#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899', '#14B8A6'];
  
  // Display only the 3 most recent transactions
  const latestTransactions = recentTransactions.slice(0, 3);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Expense by Category Chart */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
          <CardDescription>
            Breakdown of your spending across categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)} 
                    labelFormatter={(name) => name.charAt(0).toUpperCase() + name.slice(1)}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground text-center">
                  No expense data available.<br />
                  Start tracking your expenses to see insights.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 px-6 py-3">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Total Spent: <span className="font-medium text-foreground">{formatCurrency(totalExpenses)}</span>
            </span>
          </div>
        </CardFooter>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your latest expenses across all categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {latestTransactions.length > 0 ? (
              latestTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-start gap-4">
                  <div className={`rounded-full p-2 ${getCategoryColor(transaction.category)}`}>
                    <Banknote className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{transaction.description}</p>
                      <p className="font-semibold">{formatCurrency(transaction.amount)}</p>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Badge variant="outline" className="mr-2">
                        {transaction.category}
                      </Badge>
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Wallet className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-muted-foreground max-w-xs">
                  No transactions recorded yet. Add your first expense to get started.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 px-6 py-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Showing the {latestTransactions.length} most recent transactions
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}