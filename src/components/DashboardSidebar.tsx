import { DashboardSidebarProps } from "@/types/dashboard";
import { SidebarNavigation } from "./dashboard/SidebarNavigation";
import { ThreadsCounter } from "./dashboard/ThreadsCounter";
import { ProFeaturesInfo } from "./dashboard/ProFeaturesInfo";
import { Moon } from "lucide-react";

export const DashboardSidebar = ({ 
  userName, 
  onClose, 
  onShowSavedThreads, 
  onShowPricing,
  onNavigateHome 
}: DashboardSidebarProps) => {
  return (
    <div className="flex h-full flex-col bg-white text-[#1A1F2C]">
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-[#1A1F2C]">Thread Genius</h2>
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
          <ProFeaturesInfo onShowPricing={onShowPricing} />
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-[#8B5CF6] transition-colors rounded-lg">
          <Moon className="h-4 w-4" />
          <span>Dark Mode</span>
        </button>
      </div>
    </div>
  );
};