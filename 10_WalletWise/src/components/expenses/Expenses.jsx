// src/components/expenses/Expenses.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getCategoryData, getCategoryIcon, getCategoryColor } from '../../utils/categoryUtils';

const Expenses = ({ expenses }) => {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription className="text-slate-400">How you spend your money</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getCategoryData(expenses)}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {getCategoryData(expenses).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <Separator className="mb-4 bg-slate-700" />
        
        <h3 className="font-medium mb-4">Recent Expenses</h3>
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {expenses.map(expense => (
            <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-slate-600" style={{ color: getCategoryColor(expense.category) }}>
                  {getCategoryIcon(expense.category)}
                </div>
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {expense.date}
                  </p>
                </div>
              </div>
              <p className="font-medium">-₹{expense.amount}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Expenses;