import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4 sm:px-6">
      {/* Animated background */}
      <div className="absolute inset-0 bg-cyber-gradient opacity-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNNTQgMGg2djZoLTZWMHptNiA2aDZ2NmgtNlY2em0tNiA2aDZ2NmgtNnYtNnptNiA2aDZ2NmgtNnYtNnptLTYgNmg2djZoLTZ2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#1A1F2C]">
            Create <span className="bg-[#1A1F2C] text-white px-2">viral threads</span>
            <br className="hidden sm:block" /> effortlessly
          </h1>
          <p className="text-[#222222] text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto px-4 font-medium">
            Transform any YouTube video into engaging Twitter threads in seconds.
            Choose your tone, customize length, and share your content effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white transition-all duration-300"
              onClick={() => navigate('/dashboard')}
            >
              Start Creating <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-[#1A1F2C] text-[#1A1F2C] hover:bg-[#1A1F2C] hover:text-white transition-all duration-300"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};