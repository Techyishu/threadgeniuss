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
    <section id="pricing" className="relative py-20 bg-cyber-dark">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(51, 195, 240, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      {/* Static accent elements */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-cyber-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white font-orbitron animate-fade-in">
          100% Free
        </h2>
        <div className="max-w-lg mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-xl border border-cyber-blue/20 bg-cyber-darker/50 backdrop-blur-sm p-8 animate-scale-in hover:border-cyber-purple/50 transition-all duration-300"
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyber-blue text-white px-4 py-1 rounded-full text-sm font-rajdhani">
                Free Plan
              </span>
              <h3 className="text-2xl font-bold mb-2 text-white font-orbitron">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 text-cyber-blue font-orbitron">
                {plan.price}
                <span className="text-base font-normal text-gray-400 font-rajdhani">/month</span>
              </p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-300 font-rajdhani">
                    <Check className="text-cyber-blue w-5 h-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-cyber-blue hover:bg-cyber-blue/90 font-rajdhani text-lg hover:scale-105 transition-transform duration-300"
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