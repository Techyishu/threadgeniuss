import { useState } from "react";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { ThreadGenerator } from "./dashboard/ThreadGenerator";
import { ThreadPreview } from "./dashboard/ThreadPreview";
import { SavedThreads } from "./dashboard/SavedThreads";

interface DashboardProps {
  showSavedThreads?: boolean;
}

export const Dashboard = ({ showSavedThreads = false }: DashboardProps) => {
  const [generatedThread, setGeneratedThread] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-cyber-dark p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <DashboardHeader />
        {showSavedThreads ? (
          <SavedThreads />
        ) : (
          <>
            <ThreadGenerator onThreadGenerated={setGeneratedThread} />
            <ThreadPreview generatedThread={generatedThread} />
          </>
        )}
      </div>
    </div>
  );
};