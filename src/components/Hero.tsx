import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Hero = () => {
  const navigate = useNavigate();

  // Sample avatar data - these would typically come from your actual users
  const avatars = [
    { src: "/lovable-uploads/cd59cca6-eaea-4c0a-b3ea-b43388222df6.png", fallback: "U1" },
    { src: "/lovable-uploads/cd59cca6-eaea-4c0a-b3ea-b43388222df6.png", fallback: "U2" },
    { src: "/lovable-uploads/cd59cca6-eaea-4c0a-b3ea-b43388222df6.png", fallback: "U3" },
    { src: "/lovable-uploads/cd59cca6-eaea-4c0a-b3ea-b43388222df6.png", fallback: "U4" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4 sm:px-6">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#1A1F2C] opacity-[0.02]" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1A1F2C 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.1
        }} />
      </div>

      {/* Floating avatars */}
      <div className="absolute inset-0 overflow-hidden">
        {avatars.map((_, index) => (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.5}s`
            }}
          >
            <div className="w-12 h-12 rounded-full bg-white shadow-lg p-1">
              <Avatar className="w-full h-full">
                <AvatarImage src={`https://avatar.vercel.sh/${index}`} />
                <AvatarFallback>U{index + 1}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-[95%] md:max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-12">
            <img 
              src="/lovable-uploads/7d48e3a1-4d20-4175-b71b-5dc99ec8c51d.png" 
              alt="Thread Genius Logo" 
              className="h-24 md:h-32 mx-auto"
            />
          </div>
          
          <div className="mb-6 inline-block">
            <span className="px-3 py-1 text-sm font-medium bg-[#1A1F2C]/10 text-[#1A1F2C] rounded-full">
              100% Free Thread Generator
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#1A1F2C] leading-[1.1]">
            Transform Videos into
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2F3C] bg-clip-text text-transparent">
              Viral Threads
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-10 mx-auto font-medium text-[#1A1F2C]/70 max-w-2xl leading-relaxed">
            Turn any YouTube video into engaging X (Twitter) threads in seconds. 
            AI-powered content that drives engagement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white transition-all duration-300 text-lg py-6 rounded-full"
              onClick={() => navigate('/dashboard')}
            >
              Start Creating - It's Free! <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <Avatar key={i} className="w-8 h-8 border-2 border-white">
                  <AvatarImage src={`https://avatar.vercel.sh/${i}`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-[#1A1F2C]/70">
              Join thousands of content creators
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};