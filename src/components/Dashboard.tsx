import { useState } from "react";
import { ThreadGenerator } from "./dashboard/ThreadGenerator";
import { ThreadPreview } from "./dashboard/ThreadPreview";
import { SavedThreads } from "./dashboard/SavedThreads";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { PricingPlans } from "./dashboard/PricingPlans";

interface DashboardProps {
  showSavedThreads?: boolean;
}

export const Dashboard = ({ showSavedThreads = false }: DashboardProps) => {
  const [generatedThread, setGeneratedThread] = useState<string | null>(null);
  const [showPricing, setShowPricing] = useState(false);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <DashboardHeader />
        {showSavedThreads ? (
          <SavedThreads />
        ) : (
          <>
            <ThreadGenerator onThreadGenerated={setGeneratedThread} />
            <ThreadPreview generatedThread={generatedThread} />
            {showPricing && (
              <div id="pricing-section" className="pt-8">
                <h2 className="text-2xl font-bold mb-6">Upgrade to Pro</h2>
                <PricingPlans />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};