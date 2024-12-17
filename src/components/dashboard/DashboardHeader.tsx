import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-center flex-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Thread Generator
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Transform YouTube content into engaging threads
        </p>
      </div>
      <Button
        variant="outline"
        onClick={() => supabase.auth.signOut()}
        className="border-cyber-purple/30 hover:border-cyber-purple text-cyber-purple"
      >
        Sign Out
      </Button>
    </div>
  );
};