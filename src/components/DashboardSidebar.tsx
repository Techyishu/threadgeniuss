import { DashboardSidebarProps } from "@/types/dashboard";
import { SidebarNavigation } from "./dashboard/SidebarNavigation";
import { ThreadsCounter } from "./dashboard/ThreadsCounter";

export const DashboardSidebar = ({ 
  userName, 
  onClose, 
  onShowSavedThreads,
  onNavigateHome 
}: DashboardSidebarProps) => {
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
        />

        <div className="mt-6 space-y-4">
          <ThreadsCounter />
        </div>
      </nav>
    </div>
  );
};