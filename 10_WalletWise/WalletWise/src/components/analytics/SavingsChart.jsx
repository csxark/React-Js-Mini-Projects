import { useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';

export default function SavingsChart({ savingsData, expenseData }) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Prepare monthly data
  const monthlyData = useMemo(() => {
    return Array(12).fill().map((_, idx) => {
      const month = idx + 1;
      const monthSavings = savingsData.find(d => d.month === month) || { amount: 0 };
      const monthExpenses = expenseData.find(d => d.month === month) || { amount: 0 };
      
      return {
        name: monthNames[idx],
        savings: monthSavings.amount,
        expenses: monthExpenses.amount,
      };
    });
  }, [savingsData, expenseData]);
  
  // Calculate totals for quarterly data
  const quarterlyData = useMemo(() => {
    const quarters = [
      { name: 'Q1', months: [0, 1, 2] },
      { name: 'Q2', months: [3, 4, 5] },
      { name: 'Q3', months: [6, 7, 8] },
      { name: 'Q4', months: [9, 10, 11] },
    ];
    
    return quarters.map(quarter => {
      const savingsSum = quarter.months.reduce((sum, monthIdx) => {
        const month = monthIdx + 1;
        const monthData = savingsData.find(d => d.month === month) || { amount: 0 };
        return sum + monthData.amount;
      }, 0);
      
      const expensesSum = quarter.months.reduce((sum, monthIdx) => {
        const month = monthIdx + 1;
        const monthData = expenseData.find(d => d.month === month) || { amount: 0 };
        return sum + monthData.amount;
      }, 0);
      
      return {
        name: quarter.name,
        savings: savingsSum,
        expenses: expensesSum,
      };
    });
  }, [savingsData, expenseData]);
  
  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-4">
          <p className="font-medium">{label}</p>
          <p className="text-emerald-500">
            Savings: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-rose-500">
            Expenses: {formatCurrency(payload[1].value)}
          </p>
          <p className="font-medium text-muted-foreground pt-1">
            Net: {formatCurrency(payload[0].value - payload[1].value)}
          </p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings vs Expenses</CardTitle>
        <CardDescription>
          Track your financial patterns over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="mb-4">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `$${value}`}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#10B981" 
                  fillOpacity={1} 
                  fill="url(#colorSavings)" 
                  name="Savings"
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#EF4444" 
                  fillOpacity={1} 
                  fill="url(#colorExpenses)" 
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="quarterly" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={quarterlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSavingsQ" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpensesQ" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `$${value}`}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#10B981" 
                  fillOpacity={1} 
                  fill="url(#colorSavingsQ)" 
                  name="Savings"
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#EF4444" 
                  fillOpacity={1} 
                  fill="url(#colorExpensesQ)" 
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}