import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DashboardSidebarProps } from "@/types/dashboard";
import { SidebarNavigation } from "./dashboard/SidebarNavigation";
import { ThreadsCounter } from "./dashboard/ThreadsCounter";
import { ProFeaturesInfo } from "./dashboard/ProFeaturesInfo";
import { Button } from "./ui/button";

export const DashboardSidebar = ({ userName, onClose, onShowSavedThreads, onShowPricing }: DashboardSidebarProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex h-full flex-col bg-white text-[#1A1F2C]">
      <div className="flex justify-between items-center p-4 border-b border-cyber-blue/20">
        <h2 className="text-lg font-semibold text-[#1A1F2C]">Menu</h2>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <SidebarNavigation 
          userName={userName} 
          onClose={onClose} 
          onShowSavedThreads={onShowSavedThreads}
        />

        <div className="mt-6 space-y-4">
          <ThreadsCounter />
          <ProFeaturesInfo onShowPricing={onShowPricing} />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-upgrade w-full">
                Upgrade to Pro
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upgrade to Pro</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <p>Here are the benefits of upgrading to Pro...</p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="mt-4"
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </div>
  );
};