import { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
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

export default function ExpenseTrends({ expensesByCategory = [] }) {
  // Prepare category data sorted by amount
  const categoryData = useMemo(() => {
    return [...expensesByCategory].sort((a, b) => b.amount - a.amount);
  }, [expensesByCategory]);
  
  // Prepare monthly trend data
  const monthlyTrendData = useMemo(() => {
    // This would normally come from the backend
    // Simulating monthly data for now
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    // Generate random trends for top 3 categories
    const topCategories = categoryData.slice(0, 3).map(c => c.category);
    
    return months.map(month => {
      const data = { name: month };
      topCategories.forEach(category => {
        data[category] = Math.floor(Math.random() * 1000) + 500;
      });
      return data;
    });
  }, [categoryData]);
  
  // Custom tooltip formatter
  const CategoryTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-4">
          <p className="font-medium">{label}</p>
          <p>
            Total: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round(payload[0].payload.percentage)}% of expenses
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  // Generate colors for chart
  const generateColors = (categories) => {
    const colors = [
      '#10B981', // emerald
      '#8B5CF6', // violet
      '#F59E0B', // amber
      '#EF4444', // red
      '#3B82F6', // blue
      '#EC4899', // pink
      '#14B8A6', // teal
    ];
    
    return categories.reduce((acc, category, index) => {
      acc[category] = colors[index % colors.length];
      return acc;
    }, {});
  };
  
  const topCategoryColors = useMemo(() => {
    const topCategories = monthlyTrendData[0] 
      ? Object.keys(monthlyTrendData[0]).filter(key => key !== 'name')
      : [];
    
    return generateColors(topCategories);
  }, [monthlyTrendData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Analysis</CardTitle>
        <CardDescription>
          Understand your spending patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="byCategory">
          <TabsList className="mb-4">
            <TabsTrigger value="byCategory">By Category</TabsTrigger>
            <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="byCategory" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 80, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                <XAxis 
                  type="number"
                  tickFormatter={(value) => `$${value}`} 
                />
                <YAxis 
                  type="category" 
                  dataKey="category" 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CategoryTooltip />} />
                <Bar dataKey="amount" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="trends" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyTrendData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `$${value}`}
                  width={60}
                />
                <Tooltip 
                  formatter={(value, name) => [formatCurrency(value), name]} 
                />
                <Legend />
                {Object.keys(monthlyTrendData[0] || {})
                  .filter(key => key !== 'name')
                  .map((category) => (
                    <Bar 
                      key={category} 
                      dataKey={category} 
                      stackId="a" 
                      fill={topCategoryColors[category]} 
                    />
                  ))}
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}