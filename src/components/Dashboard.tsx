import { useState } from "react";
import { ThreadGenerator } from "./dashboard/ThreadGenerator";
import { ThreadPreview } from "./dashboard/ThreadPreview";
import { SavedThreads } from "./dashboard/SavedThreads";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardPricing } from "./dashboard/DashboardPricing";
import { Toaster } from "@/components/ui/toaster";

interface DashboardProps {
  showSavedThreads?: boolean;
  showPricing?: boolean;
}

export const Dashboard = ({ showSavedThreads = false, showPricing = false }: DashboardProps) => {
  const [generatedThread, setGeneratedThread] = useState<string | null>(null);

  return (
    <>
      <div className="min-h-screen bg-[#0A0F1E] p-4 sm:p-6 md:p-8">
        <div className="relative">
          <div 
            className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/90 to-blue-900/20"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)`
            }}
          />
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 relative z-10">
            <DashboardHeader />
            {showPricing ? (
              <DashboardPricing />
            ) : showSavedThreads ? (
              <SavedThreads />
            ) : (
              <div className="space-y-6">
                <ThreadGenerator onThreadGenerated={setGeneratedThread} />
                <ThreadPreview generatedThread={generatedThread} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};