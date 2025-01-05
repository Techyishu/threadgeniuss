import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Hero = () => {
  const navigate = useNavigate();

  const avatars = [
    { src: "/lovable-uploads/cd59cca6-eaea-4c0a-b3ea-b43388222df6.png", fallback: "U1" },
    { src: "/lovable-uploads/cd59cca6-eaea-4c0a-b3ea-b43388222df6.png", fallback: "U2" },
    { src: "/lovable-uploads/cd59cca6-eaea-4c0a-b3ea-b43388222df6.png", fallback: "U3" },
    { src: "/lovable-uploads/cd59cca6-eaea-4c0a-b3ea-b43388222df6.png", fallback: "U4" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cyber-dark pt-14">
      {/* Static grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(51, 195, 240, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Static accent elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-cyber-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-[95%] md:max-w-4xl mx-auto text-center">
          {/* Logo with simple fade-in animation */}
          <div className="mb-8 animate-fade-in">
            <img 
              src="/lovable-uploads/7d48e3a1-4d20-4175-b71b-5dc99ec8c51d.png" 
              alt="Thread Genius Logo" 
              className="h-28 md:h-32 lg:h-40 mx-auto"
            />
          </div>
          
          <div className="mb-4 inline-block animate-fade-in" style={{ animationDelay: '200ms' }}>
            <span className="px-3 py-1 text-sm font-medium bg-cyber-blue/10 text-cyber-blue rounded-full border border-cyber-blue/20 font-rajdhani">
              100% Free Thread Generator
            </span>
          </div>
          
          <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-[1.1] tracking-tight animate-fade-in" style={{ animationDelay: '400ms' }}>
            Transform Videos into
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
              Viral Threads
            </span>
          </h1>

          <p className="font-rajdhani text-base sm:text-lg md:text-xl mb-8 mx-auto text-gray-400 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '600ms' }}>
            Turn any YouTube video into engaging X (Twitter) threads in seconds. 
            AI-powered content that drives engagement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '800ms' }}>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-cyber-blue hover:bg-cyber-blue/90 text-white transition-all duration-300 text-lg py-6 rounded-full font-rajdhani hover:scale-105"
              onClick={() => navigate('/dashboard')}
            >
              Start Creating - It's Free! <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 animate-fade-in" style={{ animationDelay: '1000ms' }}>
            <div className="flex -space-x-2">
              {avatars.map((avatar, i) => (
                <Avatar key={i} className="w-8 h-8 border-2 border-cyber-dark">
                  <AvatarImage src={`https://avatar.vercel.sh/${i + 1}`} />
                  <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-gray-400 font-rajdhani">
              Join thousands of content creators
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};