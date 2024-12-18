import { useProStatus } from "@/hooks/useProStatus";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const ProFeaturesInfo = () => {
  const { isPro } = useProStatus();
  const { toast } = useToast();

  if (isPro) {
    return null;
  }

  const handleUpgrade = () => {
    toast({
      title: "Coming Soon",
      description: "Pro upgrade functionality will be available soon!",
    });
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