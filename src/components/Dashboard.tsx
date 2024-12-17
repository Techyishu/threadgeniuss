import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { ThreadGenerator } from "./dashboard/ThreadGenerator";
import { ThreadPreview } from "./dashboard/ThreadPreview";
import { SavedThreads } from "./dashboard/SavedThreads";

export const Dashboard = () => {
  const [generatedThread, setGeneratedThread] = useState<string | null>(null);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-cyber-dark p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              <DashboardHeader />
              <ThreadGenerator onThreadGenerated={setGeneratedThread} />
              <ThreadPreview generatedThread={generatedThread} />
            </div>
          </div>
        }
      />
      <Route path="/saved" element={<SavedThreads />} />
    </Routes>
  );
};