import { useProStatus } from "@/hooks/useProStatus";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ProFeaturesInfo = () => {
  const { isPro } = useProStatus();

  if (isPro) {
    return null;
  }

  return (
    <div className="px-4 py-2 text-center">
      <Button 
        onClick={() => window.location.hash = 'pricing-plans'}
        className="w-full bg-cyber-purple hover:bg-cyber-purple/90"
      >
        Upgrade to Pro
      </Button>
    </div>
  );
};