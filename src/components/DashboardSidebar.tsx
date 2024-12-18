import { Home, List, User, LogOut, Crown } from "lucide-react";
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

interface DashboardSidebarProps {
  userName?: string;
  onClose?: () => void;
  onShowSavedThreads?: (show: boolean) => void;
}

export const DashboardSidebar = ({ userName, onClose, onShowSavedThreads }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
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
                <DialogTitle className="text-xl font-bold text-white">Upgrade to Pro</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Coming soon! Get ready for unlimited threads and premium features.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </div>
  );
};