
import { ContentGenerator } from "./dashboard/ContentGenerator";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SavedThreads } from "./dashboard/SavedThreads";
import { DashboardPricing } from "./dashboard/DashboardPricing";

interface DashboardProps {
  showSavedThreads?: boolean;
  showPricing?: boolean;
}

export const Dashboard = ({ showSavedThreads = false, showPricing = false }: DashboardProps) => {
  const { data: generatedContent } = useQuery({
    queryKey: ['generated-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-[#1A1F2C] px-4 sm:px-6 py-6">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {showPricing ? (
          <DashboardPricing />
        ) : showSavedThreads ? (
          <SavedThreads />
        ) : (
          <div className="space-y-8">
            <div className="bg-[#222222] rounded-lg p-6">
              <ContentGenerator />
            </div>

            {generatedContent && generatedContent.length > 0 && (
              <div className="bg-[#222222] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Generations</h3>
                <div className="space-y-4">
                  {generatedContent.map((content) => (
                    <div key={content.id} className="p-4 bg-gray-900 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{content.headline}</h4>
                        <span className="text-xs text-gray-400">
                          {new Date(content.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 whitespace-pre-line">
                        {content.generated_content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
