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
    <section id="pricing" className="relative py-16 bg-[#0A0F1E]">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#0A0F1E] via-[#0A0F1E]/90 to-blue-900/20"
          style={{
            backgroundImage: `radial-gradient(circle at 100% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)`
          }}
        />
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          100% Free
        </h2>
        <div className="max-w-lg mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-xl border border-cyber-blue/20 shadow-lg shadow-cyber-blue/5 p-8 bg-[#0A0F1E]/50 backdrop-blur-sm"
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyber-blue to-cyber-purple text-white px-4 py-1 rounded-full text-sm">
                Free Plan
              </span>
              <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 text-white">
                {plan.price}
              </p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-slate-400">
                    <Check className="text-cyber-blue w-5 h-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:opacity-90 transition-opacity"
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