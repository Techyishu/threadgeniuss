import { DashboardSidebarProps } from "@/types/dashboard";
import { SidebarNavigation } from "./dashboard/SidebarNavigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProfileMenu } from "./dashboard/ProfileMenu";

export const DashboardSidebar = ({ 
  userName, 
  onClose, 
  onShowSavedThreads,
  onNavigateHome 
}: DashboardSidebarProps) => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    }
  });

  // Show either "Unlimited" for pro users or the actual remaining count for free users
  const displayCount = profile?.is_pro 
    ? "Unlimited threads available" 
    : `${profile?.threads_count || 0} thread${(profile?.threads_count || 0) === 1 ? '' : 's'} remaining`;

  return (
    <div className="flex h-full flex-col bg-[#1A1F2C] text-white">
      <div className="flex justify-between items-center p-4 border-b border-cyber-blue/20">
        <h2 className="text-lg font-semibold text-white">Menu</h2>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <SidebarNavigation 
          userName={userName} 
          onClose={onClose} 
          onShowSavedThreads={onShowSavedThreads}
          onNavigateHome={onNavigateHome}
          isPro={profile?.is_pro}
        />

        <div className="mt-6 space-y-4">
          <div className="text-sm text-gray-400">
            <span>{displayCount}</span>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-cyber-blue/20">
        <ProfileMenu />
      </div>
    </div>
  );
};