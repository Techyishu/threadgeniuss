import { Home, List, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { SidebarMenuItem } from "./dashboard/SidebarMenuItem";
import { UpgradeDialog } from "./dashboard/UpgradeDialog";

interface DashboardSidebarProps {
  userName?: string;
  onClose?: () => void;
  onShowSavedThreads?: (show: boolean) => void;
}

export const DashboardSidebar = ({ userName, onClose, onShowSavedThreads }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const [threadsCount, setThreadsCount] = useState<number>(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('threads_count, is_pro')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setThreadsCount(data.threads_count);
          setIsPro(data.is_pro);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = [
    {
      label: "Home",
      icon: Home,
      onClick: () => {
        onShowSavedThreads?.(false);
        navigate('/dashboard');
        onClose?.();
      }
    },
    {
      label: "Saved Threads",
      icon: List,
      onClick: () => {
        onShowSavedThreads?.(true);
        onClose?.();
      }
    },
    {
      label: userName || "Profile",
      icon: User,
      onClick: () => {
        onClose?.();
      }
    },
    {
      label: "Sign Out",
      icon: LogOut,
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
            <SidebarMenuItem
              key={index}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <div className="px-4 py-2 bg-cyber-blue/10 rounded-md">
            <p className="text-sm text-gray-300">Threads Remaining</p>
            <p className="text-xl font-bold text-cyber-blue">{threadsCount}</p>
          </div>

          <div className="px-4 py-2 text-center">
            <h3 className="text-cyber-blue font-semibold mb-1">Pro Features Coming Soon</h3>
            <p className="text-sm text-gray-400">Contact me for pro features</p>
          </div>
        </div>
      </nav>
    </div>
  );
};