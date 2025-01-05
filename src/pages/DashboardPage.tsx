import { Dashboard } from "@/components/Dashboard";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useToast } from "@/components/ui/use-toast";

const DashboardPage = () => {
  const [userName, setUserName] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSavedThreads, setShowSavedThreads] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (user) {
          setUserName(user.email || "User");
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch user data. Please try again.",
        });
      }
    };
    getUser();
  }, [toast]);

  const handleShowPricing = () => {
    setShowPricing(true);
    setShowSavedThreads(false);
    setIsSidebarOpen(false);
  };

  const handleShowSavedThreads = (show: boolean) => {
    setShowSavedThreads(show);
    setShowPricing(false);
    setIsSidebarOpen(false);
  };

  const handleNavigateHome = () => {
    setShowSavedThreads(false);
    setShowPricing(false);
    setIsSidebarOpen(false);
  };

  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-cyber-dark">
          {/* Mobile Sidebar */}
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild className="fixed top-4 left-4 z-50 md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-[240px] p-0 border-cyber-blue/20 bg-cyber-darker text-white"
            >
              <DashboardSidebar 
                userName={userName} 
                onClose={() => setIsSidebarOpen(false)} 
                onShowSavedThreads={handleShowSavedThreads}
                onNavigateHome={handleNavigateHome}
              />
            </SheetContent>
          </Sheet>

          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
                  <Menu className="h-6 w-6 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="w-[240px] p-0 border-cyber-blue/20 bg-cyber-darker text-white"
              >
                <DashboardSidebar 
                  userName={userName} 
                  onClose={() => setIsSidebarOpen(false)} 
                  onShowSavedThreads={handleShowSavedThreads}
                  onNavigateHome={handleNavigateHome}
                />
              </SheetContent>
            </Sheet>
          </div>

          <main className="flex-1">
            <Dashboard 
              showSavedThreads={showSavedThreads} 
              showPricing={showPricing}
            />
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
};

export default DashboardPage;