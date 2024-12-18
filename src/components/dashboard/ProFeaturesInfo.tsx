import { useProStatus } from "@/hooks/useProStatus";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProFeaturesInfo = () => {
  const { isPro } = useProStatus();
  const navigate = useNavigate();

  if (isPro) {
    return null;
  }

  const handleUpgrade = () => {
    navigate('/pricing');
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