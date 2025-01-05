import React from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { ThreadGenerator } from "./dashboard/ThreadGenerator";
import { SavedThreads } from "./dashboard/SavedThreads";
import { ThreadsCounter } from "./dashboard/ThreadsCounter";
import { useLocation } from "react-router-dom";

export const Dashboard = () => {
  const location = useLocation();
  const showThreadGenerator = location.pathname === "/dashboard";
  const showSavedThreads = location.pathname === "/dashboard/saved";

  return (
    <div className="dashboard-container flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 dashboard-content">
        <div className="max-w-6xl mx-auto space-y-8">
          <ThreadsCounter />
          {showThreadGenerator && <ThreadGenerator />}
          {showSavedThreads && <SavedThreads />}
        </div>
      </main>
    </div>
  );
};