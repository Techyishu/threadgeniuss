import { useState } from "react";
import { ThreadGenerator } from "./dashboard/ThreadGenerator";
import { ThreadPreview } from "./dashboard/ThreadPreview";
import { SavedThreads } from "./dashboard/SavedThreads";
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

  const { data: threads } = useQuery({
    queryKey: ['threads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('threads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <>
      <div className="min-h-screen bg-[#1A1F2C] px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-white">Dashboard</h1>
          
          {showPricing ? (
            <DashboardPricing />
          ) : showSavedThreads ? (
            <SavedThreads />
          ) : (
            <>
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-[#222222] rounded-lg p-4 sm:p-6 space-y-4">
                  <h2 className="text-lg sm:text-xl font-medium text-white">Generate New Thread</h2>
                  <ThreadGenerator onThreadGenerated={setGeneratedThread} />
                </div>

                {generatedThread && (
                  <div className="bg-[#222222] rounded-lg p-4 sm:p-6">
                    <ThreadPreview generatedThread={generatedThread} />
                  </div>
                )}

                <h2 className="text-lg sm:text-xl font-medium text-white">Recent Threads</h2>
                <div className="space-y-3">
                  {threads?.map((thread) => (
                    <div 
                      key={thread.id} 
                      className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <h3 className="text-gray-900 font-medium line-clamp-1">{thread.title || 'Untitled Thread'}</h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {thread.content?.split('\n').length || 0} tweets
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};