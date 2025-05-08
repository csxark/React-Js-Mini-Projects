import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  PieChart, 
  LineChart, 
  Target, 
  CreditCard, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useTheme } from '@/components/ui/theme-provider';
import { getCurrentUser, signOut } from '@/lib/supabase';

export default function MainLayout() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { user, error } = await getCurrentUser();
      
      if (error || !user) {
        navigate('/auth');
        return;
      }
      
      setCurrentUser(user);
    };
    
    checkAuth();
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/auth');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const getUserInitials = () => {
    if (!currentUser?.email) return '?';
    return currentUser.email.substring(0, 2).toUpperCase();
  };

  const navigationItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/' },
    { name: 'Expenses', icon: <CreditCard size={20} />, path: '/expenses' },
    { name: 'Savings Goals', icon: <Target size={20} />, path: '/goals' },
    { name: 'Analytics', icon: <LineChart size={20} />, path: '/analytics' },
    { name: 'Categories', icon: <PieChart size={20} />, path: '/categories' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-background"
        >
          <Menu />
        </Button>
      </div>

      {/* Sidebar overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: isSidebarOpen ? 0 : -320 }}
        transition={{ ease: 'easeOut' }}
        className="fixed md:static md:translate-x-0 h-screen w-64 bg-card z-50 border-r"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2" onClick={closeSidebar}>
              <div className="bg-emerald-500 text-white p-1 rounded">
                <PieChart size={20} />
              </div>
              <h1 className="text-xl font-bold">WalletWise</h1>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeSidebar}
              className="md:hidden"
            >
              <X size={20} />
            </Button>
          </div>
          
          <Separator />
          
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link 
                      to={item.path} 
                      className="flex items-center gap-3 px-3 py-2" 
                      onClick={closeSidebar}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 mt-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium line-clamp-1">
                    {currentUser?.email}
                  </span>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                  <Separator className="my-1" />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4 md:p-8 max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}