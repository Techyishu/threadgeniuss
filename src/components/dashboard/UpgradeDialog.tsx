import * as React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlanCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  isPro: boolean;
  isCurrentPlan: boolean;
  onSelect: () => void;
}

const PlanCard = ({ 
  title, 
  description, 
  price, 
  features, 
  isPro, 
  isCurrentPlan,
  onSelect 
}: PlanCardProps) => {
  return (
    <Card className={`${isPro ? "border-2 border-cyber-purple" : "border border-gray-700"}`}>
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-white">{price}</span>
          <span className="text-sm text-gray-400">/month</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
              <Check className="h-4 w-4 text-cyber-blue" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSelect}
          disabled={isCurrentPlan}
          className={`w-full ${isPro ? "bg-cyber-purple hover:bg-cyber-purple/90" : ""}`}
          tabIndex={isCurrentPlan ? -1 : 0}
        >
          {isCurrentPlan ? "Current Plan" : isPro ? "Upgrade to Pro" : "Stay Free"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const UpgradeDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const initialFocusRef = React.useRef<HTMLButtonElement>(null);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      toast({
        title: "Pro upgrade coming soon!",
        description: "This feature is under development.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="w-full bg-cyber-purple hover:bg-cyber-purple/90"
        ref={initialFocusRef}
      >
        Upgrade to Pro
      </Button>

      <Dialog 
        open={open} 
        onOpenChange={setOpen}
      >
        <DialogContent 
          className="sm:max-w-[900px] bg-cyber-dark border border-cyber-blue/20"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            initialFocusRef.current?.focus();
          }}
        >
          <DialogHeader>
            <DialogTitle asChild>
              <h2 className="text-2xl font-bold text-white">Choose Your Plan</h2>
            </DialogTitle>
            <DialogDescription>
              Select the plan that best fits your needs
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <PlanCard
              title="Free"
              description="Perfect to get started"
              price="$0"
              features={[
                "5 threads per month",
                "Basic thread customization",
                "Standard support"
              ]}
              isPro={false}
              isCurrentPlan={true}
              onSelect={() => setOpen(false)}
            />
            <PlanCard
              title="Pro"
              description="For power users"
              price="$5"
              features={[
                "Unlimited threads",
                "Advanced customization options",
                "Priority support",
                "Custom thread templates",
                "Analytics dashboard"
              ]}
              isPro={true}
              isCurrentPlan={false}
              onSelect={handleUpgrade}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};