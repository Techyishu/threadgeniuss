import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingPage = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Generate up to 5 threads per month",
        "Basic thread customization",
        "Copy to clipboard",
        "YouTube video integration",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      name: "Pro",
      price: "$5",
      period: "/month",
      description: "For power users who need more",
      features: [
        "Unlimited thread generation",
        "Advanced customization options",
        "Priority support",
        "Save unlimited threads",
        "Custom thread templates",
        "Advanced analytics",
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const,
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-[#8B5CF6]">Simple</span>{" "}
            <span className="text-[#D6BCFA]">Pricing</span>
          </h1>
          <p className="text-gray-400">Choose the plan that fits your needs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-8 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-cyber-purple/20 to-cyber-blue/20 border-2 border-cyber-blue"
                  : "bg-gray-900"
              }`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-400">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-400 mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-cyber-blue" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.buttonVariant}
                className="w-full"
                onClick={() => navigate("/auth")}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;