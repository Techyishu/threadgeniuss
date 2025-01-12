import { useState } from "react";
import { ThreadGenerator } from "./dashboard/ThreadGenerator";
import { ThreadPreview } from "./dashboard/ThreadPreview";
import { SavedThreads } from "./dashboard/SavedThreads";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardPricing } from "./dashboard/DashboardPricing";
import { Toaster } from "@/components/ui/toaster";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DashboardProps {
  showSavedThreads?: boolean;
  showPricing?: boolean;
}

export const Dashboard = ({ showSavedThreads = false, showPricing = false }: DashboardProps) => {
  const [generatedThread, setGeneratedThread] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

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

  const handleCardClick = (type: string) => {
    if (selectedCard === type) {
      setSelectedCard(null);
      setContentType("");
    } else {
      setSelectedCard(type);
      setContentType(type);
    }
    setGeneratedThread(null);
  };

  const contentCards = [
    {
      title: "Twitter Thread",
      type: "thread",
      description: "Generate engaging Twitter threads from YouTube videos"
    },
    {
      title: "Reddit Post",
      type: "reddit",
      description: "Create Reddit posts from your topics"
    },
    {
      title: "Long Tweet",
      type: "long_tweet",
      description: "Generate detailed long-form tweets from your topics"
    }
  ];

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contentCards.map((card) => (
                  <Card 
                    key={card.type}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      selectedCard === card.type 
                        ? 'border-cyber-blue bg-[#222222]' 
                        : 'border-gray-800 bg-[#222222]'
                    }`}
                    onClick={() => handleCardClick(card.type)}
                  >
                    <CardHeader>
                      <CardTitle className="text-white text-lg">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 text-sm">{card.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {selectedCard && (
                <>
                  <ThreadGenerator 
                    onThreadGenerated={setGeneratedThread} 
                    onContentTypeChange={setContentType}
                    selectedContentType={selectedCard}
                  />
                  <ThreadPreview 
                    generatedThread={generatedThread} 
                    contentType={contentType}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};