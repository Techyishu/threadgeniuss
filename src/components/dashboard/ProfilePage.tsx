import { Pricing } from "../Pricing";
import { DashboardHeader } from "./DashboardHeader";
import { useState } from "react";
import { DashboardSidebar } from "../DashboardSidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSavedThreads, setShowSavedThreads] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <DashboardSidebar 
            onClose={() => setSidebarOpen(false)}
            onShowSavedThreads={setShowSavedThreads}
          />
        </SheetContent>
      </Sheet>

      <main className="flex-1 overflow-y-auto">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[#1A1F2C] mb-6">Pricing Plans</h2>
              <Pricing />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};