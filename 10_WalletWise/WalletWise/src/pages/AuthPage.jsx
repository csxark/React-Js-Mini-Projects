import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, LightbulbIcon, TrendingUp, Wallet, BadgeCheck, Shield } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';
import { getCurrentUser } from '@/lib/supabase';

export default function AuthPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { user } = await getCurrentUser();
      if (user) {
        navigate('/');
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  const handleAuthSuccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - App showcase */}
      <div className="bg-emerald-500 text-white p-8 lg:w-1/2 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white p-2 rounded-lg">
              <PieChart size={24} className="text-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold">WalletWise</h1>
          </div>
          
          <h2 className="text-4xl font-bold mb-6">
            Smart savings for a brighter future
          </h2>
          
          <p className="text-lg mb-12 text-emerald-50">
            Take control of your finances with personalized insights, gamified savings goals, and intelligent spending analysis.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Feature 
              icon={<LightbulbIcon className="h-5 w-5" />}
              title="Smart Insights"
              description="Get personalized tips to improve your financial health"
            />
            <Feature 
              icon={<TrendingUp className="h-5 w-5" />}
              title="Track Goals"
              description="Set and track your short and long-term savings goals"
            />
            <Feature 
              icon={<Wallet className="h-5 w-5" />}
              title="Expense Analysis"
              description="Understand your spending patterns with visual reports"
            />
            <Feature 
              icon={<BadgeCheck className="h-5 w-5" />}
              title="Achievements"
              description="Earn rewards for developing positive savings habits"
            />
          </div>
          
          <div className="mt-12 pt-6 border-t border-emerald-400 flex items-center text-sm text-emerald-100">
            <Shield className="h-4 w-4 mr-2" />
            Your financial data is secure and encrypted
          </div>
        </motion.div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="bg-background p-8 lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md">
          <AuthForm onAuthSuccess={handleAuthSuccess} />
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <motion.div 
      className="flex gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="mt-1 bg-emerald-400 p-2 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-emerald-50">{description}</p>
      </div>
    </motion.div>
  );
}