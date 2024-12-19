import { useState } from "react";
import { DashboardSidebarProps } from "@/types/dashboard";
import { SidebarNavigation } from "./dashboard/SidebarNavigation";
import { ThreadsCounter } from "./dashboard/ThreadsCounter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

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
          <Button onClick={() => setIsDialogOpen(true)} className="w-full mt-4">
            Upgrade to Pro
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upgrade to Pro</DialogTitle>
                <DialogDescription>
                  Choose the plan that suits you best.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-semibold">Free Plan</h3>
                  <p className="text-sm">Basic features for personal use.</p>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-semibold">Pro Plan</h3>
                  <p className="text-sm">Advanced features for professionals.</p>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </div>
  );
};