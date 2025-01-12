import { useState } from "react";
import { ThreadGenerator } from "./dashboard/ThreadGenerator";
import { ThreadPreview } from "./dashboard/ThreadPreview";
import { SavedThreads } from "./dashboard/SavedThreads";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardPricing } from "./dashboard/DashboardPricing";
import { Toaster } from "@/components/ui/toaster";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DashboardProps {
  showSavedThreads?: boolean;
  showPricing?: boolean;
}

export const Dashboard = ({ showSavedThreads = false, showPricing = false }: DashboardProps) => {
  const [generatedThread, setGeneratedThread] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string>("thread");

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    }
  });

  const remainingThreads = profile?.is_pro ? "Unlimited" : Math.max(0, Math.min(profile?.threads_count || 5, 5));

  return (
    <>
      <div className="min-h-screen bg-[#1A1F2C]">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          <DashboardHeader />
          {showPricing ? (
            <DashboardPricing />
          ) : showSavedThreads ? (
            <SavedThreads />
          ) : (
            <div className="space-y-6">
              <ThreadGenerator 
                onThreadGenerated={setGeneratedThread} 
                onContentTypeChange={setContentType}
              />
              <ThreadPreview 
                generatedThread={generatedThread} 
                contentType={contentType}
              />
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};