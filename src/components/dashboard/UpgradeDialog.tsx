import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const UpgradeDialog = () => {
  const benefits = [
    "Unlimited thread generation",
    "Advanced customization options",
    "Priority support",
    "Custom thread templates",
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          className="w-full flex items-center gap-2 bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 transition-opacity"
        >
          <Crown className="h-5 w-5" />
          Upgrade to Pro
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-cyber-dark border-t border-cyber-purple/20">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold text-white">
            Upgrade to Pro
          </DrawerTitle>
          <DrawerDescription className="space-y-4">
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
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};