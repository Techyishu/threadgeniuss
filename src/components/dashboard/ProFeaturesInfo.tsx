import { useProStatus } from "@/hooks/useProStatus";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PricingPlans } from "./PricingPlans";

export const ProFeaturesInfo = () => {
  const { isPro } = useProStatus();
  const [showPricing, setShowPricing] = useState(false);

  if (isPro) {
    return null;
  }

  const handleUpgradeClick = () => {
    setShowPricing(true);
    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="px-4 py-2 text-center">
      <Button 
        onClick={handleUpgradeClick}
        className="w-full bg-cyber-purple hover:bg-cyber-purple/90"
      >
        Upgrade to Pro
      </Button>
    </div>
  );
};