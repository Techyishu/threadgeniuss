import { useState } from "react";
import { ThreadGenerator } from "./dashboard/ThreadGenerator";
import { ThreadPreview } from "./dashboard/ThreadPreview";
import { SavedThreads } from "./dashboard/SavedThreads";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardPricing } from "./dashboard/DashboardPricing";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";

interface DashboardProps {
  showSavedThreads?: boolean;
  showPricing?: boolean;
}

export const Dashboard = ({ showSavedThreads = false, showPricing = false }: DashboardProps) => {
  const [generatedThread, setGeneratedThread] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel */}
          <div className="space-y-6">
            <div className="bg-[#111] rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">YouTube to Twitter Thread</h2>
              <p className="text-gray-400 text-sm mb-6">Generate a Twitter thread from a YouTube video</p>
              <ThreadGenerator onThreadGenerated={setGeneratedThread} />
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            <div className="bg-[#111] rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Twitter Thread</h2>
              <p className="text-gray-400 text-sm mb-6">Your generated Twitter thread</p>
              <ThreadPreview generatedThread={generatedThread} />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};