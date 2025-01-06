import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4 sm:px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/20 to-white" />

      <div className="container mx-auto relative z-10 pt-20 pb-32">
        <div className="max-w-[95%] md:max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/7d48e3a1-4d20-4175-b71b-5dc99ec8c51d.png" 
              alt="Thread Genius Logo" 
              className="h-24 md:h-32 mx-auto"
            />
          </div>
          
          {/* Green pill badge */}
          <div className="mb-6 inline-block">
            <div className="px-4 py-1.5 text-sm font-medium bg-green-100 text-green-800 rounded-full flex items-center gap-2">
              <span>New</span>
              <span className="w-1 h-1 bg-green-800 rounded-full"></span>
              <span>AI-Powered Thread Generation →</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[#1A1F2C] leading-[1.1] tracking-tight">
            Transform YouTube Videos
            <br />
            <span>Into Viral Threads</span>
          </h1>

          <p className="text-lg text-gray-600 mb-10 mx-auto max-w-2xl leading-relaxed">
            Thread Genius uses advanced AI to convert any YouTube video into engaging Twitter threads.
            <br />
            Generate viral-worthy content in seconds, not hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white transition-all duration-300 text-base py-6 px-8 rounded-lg flex items-center gap-2"
              onClick={() => navigate('/dashboard')}
            >
              Start Creating Threads <ArrowRight className="h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-300 text-base py-6 px-8 rounded-lg flex items-center gap-2"
              onClick={() => navigate('/dashboard')}
            >
              <Play className="h-5 w-5" /> See How It Works
            </Button>
          </div>

          {/* Dashboard Preview Image */}
          <div className="relative mx-auto max-w-5xl">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="/lovable-uploads/c99a4a2f-077d-485d-8ccd-c31135de4fc7.png"
                alt="Thread Generator Dashboard Preview"
                className="w-full h-auto"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative blur effects */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
          </div>
        </div>
      </div>
    </div>
  );
};