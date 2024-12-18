import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const PricingPlans = () => {
  const { toast } = useToast();

  const handleUpgrade = async () => {
    // This is a placeholder for the actual upgrade logic
    toast({
      title: "Coming Soon",
      description: "Pro upgrade functionality will be available soon!",
    });
  };

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold text-[#1A1F2C]">Choose Your Plan</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Free Plan */}
        <Card className="border-cyber-blue/20">
          <CardHeader>
            <CardTitle className="text-xl">Free Plan</CardTitle>
            <CardDescription>Get started with basic features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">$0/month</div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-cyber-blue" />
                <span>5 threads per month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-cyber-blue" />
                <span>Basic thread generation</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="border-cyber-purple">
          <CardHeader>
            <CardTitle className="text-xl">Pro Plan</CardTitle>
            <CardDescription>Unlock unlimited potential</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">$9.99/month</div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-cyber-purple" />
                <span>Unlimited threads</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-cyber-purple" />
                <span>Advanced thread generation</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-cyber-purple" />
                <span>Priority support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-cyber-purple hover:bg-cyber-purple/90"
              onClick={handleUpgrade}
            >
              Upgrade to Pro
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};