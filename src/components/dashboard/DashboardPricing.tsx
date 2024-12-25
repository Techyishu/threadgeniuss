import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["5 threads per month", "Basic thread styles"],
    buttonText: "Current Plan",
    popular: false,
  },
  {
    name: "Pro",
    price: "$5",
    features: [
      "Unlimited threads",
      "Custom thread styles",
      "Choose tone and thread size",
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
  },
];

export const DashboardPricing = () => {
  const { toast } = useToast();

  const handleUpgrade = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Error",
          description: "Please sign in to upgrade",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-paypal-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Redirect to PayPal approval URL
      window.location.href = data.approvalUrl;
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast({
        title: "Error",
        description: "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
        Upgrade Your Experience
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-xl border ${
              plan.popular
                ? "border-cyber-blue shadow-lg"
                : "border-gray-200"
            } p-8 bg-white`}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyber-blue text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </span>
            )}
            <h3 className="text-2xl font-bold mb-2 text-[#1A1F2C]">{plan.name}</h3>
            <p className="text-4xl font-bold mb-6 text-[#1A1F2C]">
              {plan.price}
              <span className="text-gray-500 text-base font-normal">/month</span>
            </p>
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-[#1A1F2C]">
                  <Check className="text-cyber-blue w-5 h-5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className={`w-full ${
                plan.popular
                  ? "bg-cyber-blue hover:bg-cyber-blue/90"
                  : "bg-[#1A1F2C] hover:bg-[#2A2F3C]"
              }`}
              onClick={plan.popular ? handleUpgrade : undefined}
              disabled={!plan.popular}
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};