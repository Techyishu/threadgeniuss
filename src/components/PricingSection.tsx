import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-dark">
      {/* Animated background */}
      <div className="absolute inset-0 bg-cyber-gradient opacity-20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNNTQgMGg2djZoLTZWMHptNiA2aDZ2NmgtNlY2em0tNiA2aDZ2NmgtNnYtNnptNiA2aDZ2NmgtNnYtNnptLTYgNmg2djZoLTZ2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-gray-300">
            Choose the plan that's right for you
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="relative flex flex-col p-6 bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
              <p className="text-gray-300">Perfect to get started</p>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-5xl font-extrabold tracking-tight">$0</span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </div>
            </div>
            <ul className="mb-8 space-y-4 flex-1 text-gray-300">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-cyber-blue mr-2" />
                <span>5 threads per month</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-cyber-blue mr-2" />
                <span>Basic thread customization</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-cyber-blue mr-2" />
                <span>Standard support</span>
              </li>
            </ul>
            <Button
              onClick={() => navigate('/auth')}
              variant="outline"
              className="w-full bg-gray-700/50 border-cyber-blue text-white hover:bg-gray-600/50"
            >
              Get Started
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="relative flex flex-col p-6 bg-gradient-to-b from-cyber-purple/20 to-cyber-blue/20 backdrop-blur-sm rounded-lg shadow-lg border border-cyber-purple">
            <div className="absolute -top-5 right-0">
              <span className="bg-cyber-purple text-white px-3 py-1 rounded-full text-sm font-semibold">
                Popular
              </span>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
              <p className="text-gray-300">For power users</p>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-5xl font-extrabold tracking-tight">$5</span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </div>
            </div>
            <ul className="mb-8 space-y-4 flex-1 text-gray-300">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-cyber-blue mr-2" />
                <span>Unlimited threads</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-cyber-blue mr-2" />
                <span>Advanced customization options</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-cyber-blue mr-2" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-cyber-blue mr-2" />
                <span>Custom thread templates</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-cyber-blue mr-2" />
                <span>Analytics dashboard</span>
              </li>
            </ul>
            <Button
              onClick={() => navigate('/auth')}
              className="w-full bg-cyber-purple hover:bg-cyber-purple/90"
            >
              Get Pro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};