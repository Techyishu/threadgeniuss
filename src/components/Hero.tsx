import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2, Zap, Gauge, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0A0F1E] px-4 sm:px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/90 to-blue-900/20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="container relative z-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
              Transform YouTube Videos into
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                viral threads & tweets
              </span>
            </h1>

            {/* CTA Button */}
            <div className="mb-12">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-gray-900 transition-all duration-300 text-lg py-6 px-8 rounded-lg shadow-lg"
                onClick={() => navigate('/dashboard')}
              >
                Start Creating Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <FeatureCard
                icon={<Globe2 className="h-5 w-5" />}
                title="AI-Powered Content"
                description="Generate engaging threads automatically."
              />
              <FeatureCard
                icon={<Zap className="h-5 w-5" />}
                title="Instant Generation"
                description="Get viral content in seconds."
              />
              <FeatureCard
                icon={<Gauge className="h-5 w-5" />}
                title="Multiple Formats"
                description="Create Twitter threads easily."
              />
              <FeatureCard
                icon={<Wrench className="h-5 w-5" />}
                title="Easy to Use"
                description="Just paste your YouTube URL."
              />
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative hidden md:block">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <img
                src="/lovable-uploads/0251e147-8985-4239-81ea-09df6aa078c7.png"
                alt="Dashboard Preview"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
              {/* Add a subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyber-dark/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-b from-gray-800/50 to-transparent border border-gray-800">
      <div className="mb-2 text-blue-400">{icon}</div>
      <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
      <p className="text-gray-400 text-xs">{description}</p>
    </div>
  );
};