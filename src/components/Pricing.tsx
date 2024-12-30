import { Check } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Unlimited threads",
      "Custom thread styles",
      "Choose tone and thread size",
    ],
    buttonText: "Get Started",
    popular: true,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="relative py-16 bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#1A1F2C] opacity-[0.02]" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1A1F2C 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.1
        }} />
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
          100% Free
        </h2>
        <div className="max-w-lg mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-xl border border-cyber-blue shadow-lg p-8 bg-white"
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyber-blue text-white px-4 py-1 rounded-full text-sm">
                Free Plan
              </span>
              <h3 className="text-2xl font-bold mb-2 text-[#1A1F2C]">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 text-[#1A1F2C]">
                {plan.price}
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
                className="w-full bg-cyber-blue hover:bg-cyber-blue/90"
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