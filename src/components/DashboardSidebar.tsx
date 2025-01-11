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
    <div className="flex h-full flex-col bg-cyber-dark text-white">
      <div className="flex justify-between items-center p-4 border-b border-cyber-blue/20 bg-gradient-to-r from-cyber-dark to-cyber-gray-900">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
          Menu
        </h2>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-cyber-dark to-cyber-gray-900">
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