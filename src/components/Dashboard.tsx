import React, { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { ThreadGenerator } from "./dashboard/ThreadGenerator";
import { SavedThreads } from "./dashboard/SavedThreads";
import { ThreadsCounter } from "./dashboard/ThreadsCounter";
import { useLocation } from "react-router-dom";

interface DashboardProps {
  showSavedThreads?: boolean;
  showPricing?: boolean;
}

export const Dashboard = ({ showSavedThreads: propShowSavedThreads, showPricing }: DashboardProps) => {
  const location = useLocation();
  const showThreadGenerator = location.pathname === "/dashboard";
  const showSavedThreads = location.pathname === "/dashboard/saved" || propShowSavedThreads;
  const [generatedThread, setGeneratedThread] = useState<string | null>(null);

  const handleThreadGenerated = (thread: string | null) => {
    setGeneratedThread(thread);
  };

  return (
    <div className="dashboard-container flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 dashboard-content">
        <div className="max-w-6xl mx-auto space-y-8">
          <ThreadsCounter />
          {showThreadGenerator && <ThreadGenerator onThreadGenerated={handleThreadGenerated} />}
          {showSavedThreads && <SavedThreads />}
        </div>
      </main>
    </div>
  );
};