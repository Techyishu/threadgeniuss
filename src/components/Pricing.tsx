import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: "Basic",
    price: "$0",
    period: "/month",
    features: [
      "5 threads per month",
      "Basic thread styles",
      "Basic chat support",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$2",
    period: "/month",
    features: [
      "Unlimited threads",
      "Custom thread styles",
      "Choose tone and thread size",
      "Priority support",
    ],
    buttonText: "Get Started",
    popular: true,
  },
];

export const Pricing = () => {
  const navigate = useNavigate();

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
          Choose Your Plan
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border ${
                plan.popular
                  ? "border-cyber-blue/50 shadow-lg shadow-cyber-blue/20"
                  : "border-gray-800"
              } p-8 bg-[#0A0F1E]/80 backdrop-blur-sm`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyber-blue to-cyber-purple text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <p className="text-4xl font-bold text-white">{plan.price}</p>
                <span className="text-gray-400 ml-1">{plan.period}</span>
              </div>
              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="text-cyber-blue w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-cyber-blue to-cyber-purple hover:opacity-90"
                    : "bg-gray-800 hover:bg-gray-700"
                } transition-all duration-200`}
                onClick={() => navigate('/auth')}
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