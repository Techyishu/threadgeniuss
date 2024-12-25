import { useState } from "react";
import { ThreadGenerator } from "./dashboard/ThreadGenerator";
import { ThreadPreview } from "./dashboard/ThreadPreview";
import { TweetGenerator } from "./dashboard/TweetGenerator";
import { TweetPreview } from "./dashboard/TweetPreview";
import { SavedThreads } from "./dashboard/SavedThreads";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardPricing } from "./dashboard/DashboardPricing";
import { Toaster } from "@/components/ui/toaster";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardProps {
  showSavedThreads?: boolean;
  showPricing?: boolean;
}

export const Dashboard = ({ showSavedThreads = false, showPricing = false }: DashboardProps) => {
  const [generatedThread, setGeneratedThread] = useState<string | null>(null);
  const [generatedTweet, setGeneratedTweet] = useState<string | null>(null);

  return (
    <>
      <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <DashboardHeader />
          {showPricing ? (
            <DashboardPricing />
          ) : showSavedThreads ? (
            <SavedThreads />
          ) : (
            <Tabs defaultValue="thread" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="thread">Thread Generator</TabsTrigger>
                <TabsTrigger value="tweet">Tweet Generator</TabsTrigger>
              </TabsList>
              <TabsContent value="thread" className="space-y-6">
                <ThreadGenerator onThreadGenerated={setGeneratedThread} />
                <ThreadPreview generatedThread={generatedThread} />
              </TabsContent>
              <TabsContent value="tweet" className="space-y-6">
                <TweetGenerator onTweetGenerated={setGeneratedTweet} />
                <TweetPreview generatedTweet={generatedTweet} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};