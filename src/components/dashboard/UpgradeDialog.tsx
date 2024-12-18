import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const UpgradeDialog = () => {
  const plans = [
    {
      name: "Free",
      description: "Perfect to get started",
      price: "$0",
      features: [
        "5 threads per month",
        "Basic thread customization",
        "Standard support",
      ],
      current: true
    },
    {
      name: "Pro",
      description: "For power users",
      price: "$5",
      features: [
        "Unlimited threads",
        "Advanced customization options",
        "Priority support",
        "Custom thread templates",
        "Analytics dashboard",
      ],
      popular: true
    }
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          className="w-full flex items-center gap-2 bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 transition-opacity"
        >
          <Crown className="h-5 w-5" />
          Upgrade to Pro
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[540px] bg-cyber-dark border-cyber-purple/20">
        <SheetHeader className="space-y-2 text-white">
          <SheetTitle className="text-2xl font-bold text-center">Choose Your Plan</SheetTitle>
          <SheetDescription className="text-gray-400 text-center">
            Select the plan that best fits your needs
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-lg border ${
                plan.popular
                  ? "bg-gradient-to-b from-cyber-purple/20 to-cyber-blue/20 border-cyber-purple"
                  : "bg-gray-800/80 border-gray-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-cyber-purple text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </span>
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-gray-400">{plan.description}</p>
                <div className="mt-2 flex items-baseline text-white">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-lg">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-cyber-blue mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-cyber-purple hover:bg-cyber-purple/90"
                    : "bg-gray-700/50 border-cyber-blue hover:bg-gray-600/50"
                }`}
                disabled
              >
                {plan.current ? "Current Plan" : "Coming Soon"}
              </Button>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};