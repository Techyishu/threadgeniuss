import { Home, List, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useToast } from "@/components/ui/use-toast";

interface SidebarNavigationProps {
  userName?: string;
  onClose?: () => void;
  onShowSavedThreads?: (show: boolean) => void;
}

export const SidebarNavigation = ({ userName, onClose, onShowSavedThreads }: SidebarNavigationProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
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
  );
};