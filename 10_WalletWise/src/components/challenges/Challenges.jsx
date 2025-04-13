// src/components/challenges/Challenges.jsx
import React from 'react';
import { Wallet, TrendingUp, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { challenges } from '../../data/mockData';

const Challenges = () => {
  return (
    <div className="grid gap-4">
      {challenges.map(challenge => (
        <Card key={challenge.id} className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg">{challenge.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={challenge.progress} 
              className="h-2 mb-2 bg-slate-700" 
            />
            <p className="text-sm text-right text-slate-400">{challenge.progress}% complete</p>
          </CardContent>
        </Card>
      ))}
      
      {/* Low Spender Perks */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Spending Less Perks</CardTitle>
          <CardDescription className="text-slate-400">Rewards for spending less than last month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700">
              <div className="p-2 rounded-full bg-green-900 text-green-300">
                <Wallet className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">2% Cashback on Next Expense</p>
                <p className="text-sm text-slate-400">Spend less than previous month</p>
              </div>
              <Badge className="ml-auto">Active</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700">
              <div className="p-2 rounded-full bg-blue-900 text-blue-300">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">0.5% Interest Bonus</p>
                <p className="text-sm text-slate-400">If spending reduction continues for 3 months</p>
              </div>
              <Badge className="ml-auto bg-slate-600">Month 1/3</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700">
              <div className="p-2 rounded-full bg-purple-900 text-purple-300">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Priority Customer Support</p>
                <p className="text-sm text-slate-400">Beat last month by 20%</p>
              </div>
              <Badge className="ml-auto bg-slate-600">Inactive</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenges;