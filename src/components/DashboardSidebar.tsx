import { Home, List, User, LogOut, Crown, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  userName?: string;
  onClose?: () => void;
  onShowSavedThreads?: (show: boolean) => void;
}

export const DashboardSidebar = ({ userName, onClose, onShowSavedThreads }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const [threadsCount, setThreadsCount] = useState<number>(5);

  useEffect(() => {
    fetchThreadsCount();
  }, []);

  const fetchThreadsCount = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('threads_count')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setThreadsCount(data.threads_count);
        }
      }
    } catch (error) {
      console.error('Error fetching threads count:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = [
    {
      label: "Home",
      icon: <Home className="h-5 w-5" />,
      onClick: () => {
        onShowSavedThreads?.(false);
        navigate('/dashboard');
        onClose?.();
      }
    },
    {
      label: "Saved Threads",
      icon: <List className="h-5 w-5" />,
      onClick: () => {
        onShowSavedThreads?.(true);
        onClose?.();
      }
    },
    {
      label: userName || "Profile",
      icon: <User className="h-5 w-5" />,
      onClick: () => {
        onClose?.();
      }
    },
    {
      label: "Sign Out",
      icon: <LogOut className="h-5 w-5" />,
      onClick: () => {
        handleSignOut();
        onClose?.();
      }
    }
  ];

  return (
    <div className="flex h-full flex-col bg-cyber-dark text-white">
      <div className="flex justify-between items-center p-4 border-b border-cyber-blue/20">
        <h2 className="text-lg font-semibold text-cyber-blue">Menu</h2>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-cyber-blue/20 rounded-md"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <div className="px-4 py-2 bg-cyber-blue/10 rounded-md">
            <p className="text-sm text-gray-300">Threads Remaining</p>
            <p className="text-xl font-bold text-cyber-blue">{threadsCount}</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <button
                className="w-full flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyber-purple to-cyber-blue rounded-md text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Crown className="h-5 w-5" />
                Upgrade to Pro
              </button>
            </DialogTrigger>
            <DialogContent className="bg-cyber-dark border border-cyber-purple/20">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-white mb-4">
                  Upgrade to Pro
                </DialogTitle>
                <DialogDescription className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-cyber-blue mt-0.5" />
                      <span className="text-gray-300">Unlimited thread generation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-cyber-blue mt-0.5" />
                      <span className="text-gray-300">Advanced customization options</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-cyber-blue mt-0.5" />
                      <span className="text-gray-300">Priority support</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-cyber-blue mt-0.5" />
                      <span className="text-gray-300">Custom thread templates</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-cyber-purple/20">
                    <Button 
                      className="w-full bg-cyber-purple hover:bg-cyber-purple/90 text-white"
                      disabled
                    >
                      Coming Soon
                    </Button>
                    <p className="text-sm text-gray-400 text-center mt-2">
                      Get ready for an enhanced thread generation experience!
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </div>
  );
};