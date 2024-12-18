import { Check, Crown } from "lucide-react";
import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  
  const benefits = [
    "Unlimited thread generation",
    "Advanced customization options",
    "Priority support",
    "Custom thread templates",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full flex items-center gap-2 bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 transition-opacity"
          onClick={() => setIsOpen(true)}
        >
          <Crown className="h-5 w-5" />
          Upgrade to Pro
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-cyber-dark border border-cyber-purple/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
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