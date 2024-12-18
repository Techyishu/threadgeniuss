import { useProStatus } from "@/hooks/useProStatus";
import { Button } from "@/components/ui/button";

interface ProFeaturesInfoProps {
  onShowPricing: () => void;
}

export const ProFeaturesInfo = ({ onShowPricing }: ProFeaturesInfoProps) => {
  const { isPro } = useProStatus();

  if (isPro) {
    return null;
  }

  const handleUpgradeClick = () => {
    onShowPricing();
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