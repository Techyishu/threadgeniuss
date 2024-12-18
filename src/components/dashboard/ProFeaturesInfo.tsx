import { useProStatus } from "@/hooks/useProStatus";
import { Button } from "@/components/ui/button";

export const ProFeaturesInfo = () => {
  const { isPro } = useProStatus();

  if (isPro) {
    return null;
  }

  const handleUpgrade = () => {
    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing-plans');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="px-4 py-2 text-center">
      <Button 
        onClick={handleUpgrade}
        className="w-full bg-cyber-purple hover:bg-cyber-purple/90"
      >
        Upgrade to Pro
      </Button>
    </div>
  );
};