import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2, Zap, Gauge, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0A0F1E] px-4 sm:px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/90 to-blue-900/20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="container relative z-10 max-w-[1200px] mx-auto text-center">
        {/* Hexagon Icon */}
        <div className="w-16 h-16 mx-auto mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl transform rotate-45" />
          <div className="absolute inset-2 bg-[#0A0F1E] rounded-lg transform rotate-45" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 text-white leading-[1.1] tracking-tight max-w-4xl mx-auto">
          Build, host, and scale your
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            viral content strategy
          </span>
        </h1>

        {/* CTA Button */}
        <div className="mb-20">
          <Button
            size="lg"
            className="bg-white hover:bg-gray-100 text-gray-900 transition-all duration-300 text-lg py-6 px-8 rounded-lg shadow-lg"
            onClick={() => navigate('/dashboard')}
          >
            Start Creating For Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Globe2 className="h-6 w-6" />}
            title="Content Infrastructure"
            description="AI-powered thread generation with reliable content engine."
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Zero configuration"
            description="Start creating viral threads instantly. No setup required."
          />
          <FeatureCard
            icon={<Gauge className="h-6 w-6" />}
            title="Effortless scaling"
            description="Built to handle your growing content needs efficiently."
          />
          <FeatureCard
            icon={<Wrench className="h-6 w-6" />}
            title="No maintenance"
            description="Focus on creating content, not managing infrastructure."
          />
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
    <div className="p-6 rounded-xl bg-gradient-to-b from-gray-800/50 to-transparent border border-gray-800">
      <div className="mb-4 text-blue-400">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};