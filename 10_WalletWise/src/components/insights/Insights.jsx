// src/components/insights/Insights.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Insights = ({ savingsHistory }) => {
  return (
    <>
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Savings History</CardTitle>
          <CardDescription className="text-slate-400">Track your saving progress over time</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={savingsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                formatter={(value) => [`₹${value}`, 'Amount']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#A78BFA" 
                strokeWidth={2}
                dot={{ r: 4, fill: '#A78BFA' }}
                activeDot={{ r: 6, fill: '#A78BFA' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="mt-4 bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Saving Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Alert className="bg-blue-900 border-blue-800 text-blue-100">
            <AlertCircle className="h-4 w-4 text-blue-300" />
            <AlertTitle>Automate Your Savings</AlertTitle>
            <AlertDescription className="text-blue-200">
              Set up automatic transfers to build your savings consistently.
            </AlertDescription>
          </Alert>
          <Alert className="bg-purple-900 border-purple-800 text-purple-100">
            <AlertCircle className="h-4 w-4 text-purple-300" />
            <AlertTitle>50/30/20 Rule</AlertTitle>
            <AlertDescription className="text-purple-200">
              Try allocating 50% to needs, 30% to wants, and 20% to savings.
            </AlertDescription>
          </Alert>
          <Alert className="bg-green-900 border-green-800 text-green-100">
            <AlertCircle className="h-4 w-4 text-green-300" />
            <AlertTitle>Review Subscriptions</AlertTitle>
            <AlertDescription className="text-green-200">
              Review and cancel unused subscriptions to save money monthly.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </>
  );
};

export default Insights;