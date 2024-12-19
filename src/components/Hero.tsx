import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-2 sm:px-6">
      <div className="absolute inset-0 bg-cyber-gradient opacity-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNNTQgMGg2djZoLTZWMHptNiA2aDZ2NmgtNlY2em0tNiA2aDZ2NmgtNnYtNnptNiA2aDZ2NmgtNnYtNnptLTYgNmg2djZoLTZ2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-[95%] md:max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-[#1A1F2C] leading-tight">
            <span className="inline-block">Create <span className="bg-[#1A1F2C] text-white px-3 py-1">viral threads</span></span>
            <br />
            <span className="inline-block">effortlessly</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 mx-auto px-2 sm:px-4 font-medium text-[#222222] max-w-[90%] sm:max-w-2xl leading-relaxed">
            Transform any YouTube video into engaging Twitter threads in seconds.
            Choose your tone, customize length, and share your content effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-2 sm:px-4 w-full max-w-xl mx-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white transition-all duration-300 text-lg py-6"
              onClick={() => navigate('/dashboard')}
            >
              Start Creating <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-[#1A1F2C] text-[#1A1F2C] hover:bg-[#1A1F2C] hover:text-white transition-all duration-300 text-lg py-6"
              onClick={scrollToPricing}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};