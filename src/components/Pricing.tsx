import { Check } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["5 threads per month", "Basic thread styles"],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$5",
    features: [
      "Unlimited threads",
      "Custom thread styles",
      "choose tone and thread size",
    ],
    buttonText: "coming soon",
    popular: true,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border ${
                plan.popular
                  ? "border-cyber-blue shadow-lg"
                  : "border-gray-200"
              } p-8`}
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
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
