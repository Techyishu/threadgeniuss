import { useProStatus } from "@/hooks/useProStatus";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { PricingPlans } from "./PricingPlans";

export const ProFeaturesInfo = () => {
  const { isPro } = useProStatus();
  const [showPricing, setShowPricing] = useState(false);

  if (isPro) {
    return null;
  }

  return (
    <>
      <div className="px-4 py-2 text-center">
        <Button 
          onClick={() => setShowPricing(true)}
          className="w-full bg-cyber-purple hover:bg-cyber-purple/90"
        >
          Upgrade to Pro
        </Button>
      </div>

      <Dialog open={showPricing} onOpenChange={setShowPricing}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Upgrade to Pro</DialogTitle>
          </DialogHeader>
          <PricingPlans />
        </DialogContent>
      </Dialog>
    </>
  );
};