import { Home, List, User, LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  userName?: string;
  onClose?: () => void;
}

export const DashboardSidebar = ({ userName, onClose }: DashboardSidebarProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = [
    {
      label: "Home",
      icon: <Home className="h-5 w-5" />,
      onClick: () => {
        navigate('/dashboard');
        onClose?.();
      }
    },
    {
      label: "Saved Threads",
      icon: <List className="h-5 w-5" />,
      onClick: () => {
        navigate('/dashboard/saved');
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
        <Button variant="ghost" size="icon" onClick={onClose} className="text-cyber-blue">
          <X className="h-5 w-5" />
        </Button>
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
      </nav>
    </div>
  );
};