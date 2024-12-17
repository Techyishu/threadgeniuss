import { Dashboard } from "@/components/Dashboard";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const DashboardPage = () => {
  const [userName, setUserName] = useState<string>("");

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
        <DashboardSidebar userName={userName} />
        <main className="flex-1">
          <Dashboard />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;