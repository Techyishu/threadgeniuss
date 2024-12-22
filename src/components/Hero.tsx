import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main heading with improved typography */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1A1F2C] leading-[1.1]">
            Unlock Your Potential With
            <span className="block mt-2">Thread Generation.</span>
          </h1>

          {/* Subtitle with better spacing and font */}
          <p className="text-lg sm:text-xl text-[#4A5568] max-w-2xl mx-auto leading-relaxed">
            We're here to empower you every step of the way. Whether you're managing your
            content or seeking innovative thread opportunities.
          </p>

          {/* Button group with updated styling */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white px-8 py-6 text-lg rounded-full transition-all duration-300"
              onClick={() => navigate('/dashboard')}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-[#1A1F2C] text-[#1A1F2C] hover:bg-[#1A1F2C] hover:text-white px-8 py-6 text-lg rounded-full transition-all duration-300"
              onClick={scrollToPricing}
            >
              Learn More
            </Button>
          </div>

          {/* Active users section */}
          <div className="pt-12">
            <div className="flex items-center justify-center -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                >
                  <span className="text-xs font-medium text-gray-600">
                    {String.fromCharCode(64 + i)}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Over 50,000+ Active Users
            </p>
          </div>
        </div>
      </div>

      {/* Decorative curved line */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50/20 to-transparent"></div>
    </div>
  );
};