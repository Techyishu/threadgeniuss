import { Dashboard } from "@/components/Dashboard";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const DashboardPage = () => {
  const [userName, setUserName] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSavedThreads, setShowSavedThreads] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.email || "User");
      }
    };
    getUser();
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-cyber-dark text-white">
        {/* Mobile Sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-50 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-[240px] p-0 border-cyber-blue/20 bg-cyber-dark text-white"
            onInteractOutside={(e) => {
              e.preventDefault();
              setIsSidebarOpen(false);
            }}
            onEscapeKeyDown={() => setIsSidebarOpen(false)}
          >
            <DashboardSidebar 
              userName={userName} 
              onClose={() => setIsSidebarOpen(false)} 
              onShowSavedThreads={setShowSavedThreads}
            />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="fixed top-4 left-4 z-50"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-[240px] p-0 border-cyber-blue/20 bg-cyber-dark text-white"
              onInteractOutside={(e) => {
                e.preventDefault();
                setIsSidebarOpen(false);
              }}
              onEscapeKeyDown={() => setIsSidebarOpen(false)}
            >
              <DashboardSidebar 
                userName={userName} 
                onClose={() => setIsSidebarOpen(false)} 
                onShowSavedThreads={setShowSavedThreads}
              />
            </SheetContent>
          </Sheet>
        </div>

        <main className="flex-1">
          <Dashboard showSavedThreads={showSavedThreads} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;