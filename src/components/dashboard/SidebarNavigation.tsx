import { Crown, Home, List, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface SidebarNavigationProps {
  userName?: string;
  onClose?: () => void;
  onShowSavedThreads?: (show: boolean) => void;
  onNavigateHome?: () => void;
  isPro?: boolean;
}

export const SidebarNavigation = ({ 
  onClose, 
  onShowSavedThreads, 
  onNavigateHome,
  isPro 
}: SidebarNavigationProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleUpgrade = async () => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Error",
          description: "Please sign in to upgrade",
          variant: "destructive",
        });
        return;
      }

      console.log('Creating PayPal subscription...');
      const { data, error } = await supabase.functions.invoke('create-paypal-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Subscription error:', error);
        throw new Error(error.message || 'Failed to create subscription');
      }

      if (!data?.approvalUrl) {
        throw new Error('No approval URL received from PayPal');
      }

      // Redirect to PayPal approval URL
      window.location.href = data.approvalUrl;
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast({
        title: "Subscription Error",
        description: error.message || "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const menuItems = [
    {
      label: "Home",
      icon: Home,
      onClick: () => {
        onNavigateHome?.();
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
      label: "Profile",
      icon: User,
      onClick: () => {
        onClose?.();
      }
    },
    !isPro && {
      label: isLoading ? "Processing..." : "Upgrade to Pro",
      icon: Crown,
      onClick: handleUpgrade,
      className: "text-cyber-blue hover:text-cyber-blue/90"
    },
    {
      label: "Sign Out",
      icon: LogOut,
      onClick: () => {
        handleSignOut();
        onClose?.();
      }
    }
  ].filter(Boolean);

  return (
    <div className="space-y-2">
      {menuItems.map((item, index) => (
        item && (
          <SidebarMenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            className={item.className}
          />
        )
      ))}
    </div>
  );
};