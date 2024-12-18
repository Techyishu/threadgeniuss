import { Check, Crown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const UpgradeDialog = () => {
  const benefits = [
    "Unlimited thread generation",
    "Advanced customization options",
    "Priority support",
    "Custom thread templates",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyber-purple to-cyber-blue rounded-md text-white font-medium hover:opacity-90 transition-opacity">
          <Crown className="h-5 w-5" />
          Upgrade to Pro
        </button>
      </DialogTrigger>
      <DialogContent className="bg-cyber-dark border border-cyber-purple/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white mb-4">
            Upgrade to Pro
          </DialogTitle>
          <DialogDescription className="space-y-4">
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-cyber-blue mt-0.5" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-cyber-purple/20">
              <Button 
                className="w-full bg-cyber-purple hover:bg-cyber-purple/90 text-white"
                disabled
              >
                Coming Soon
              </Button>
              <p className="text-sm text-gray-400 text-center mt-2">
                Get ready for an enhanced thread generation experience!
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};