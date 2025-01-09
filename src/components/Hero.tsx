import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-darker">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-neon-grid bg-[length:50px_50px] opacity-10" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker via-cyber-dark to-transparent" />

      {/* Animated glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-blue/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-purple/20 rounded-full blur-[100px] animate-pulse delay-300" />

      <div className="container mx-auto relative z-10 pt-20 pb-32 px-4">
        <div className="max-w-[95%] md:max-w-4xl mx-auto text-center">
          {/* Service badge */}
          <div className="mb-8 inline-block">
            <span className="px-4 py-1.5 text-sm font-medium bg-cyber-darker border border-cyber-blue/30 text-cyber-blue rounded-full shadow-neon animate-pulse">
              AI-Powered Thread Generation
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-[1.1] tracking-tight animate-neonPulse">
            Transform Your Videos into
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
              Viral Twitter Threads
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-12 mx-auto text-cyber-blue/80 max-w-2xl leading-relaxed">
            Turn any YouTube video into engaging Twitter threads in seconds. 
            Save hours of content creation with AI-powered automation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-cyber-blue to-cyber-purple hover:opacity-90 text-white transition-all duration-300 text-lg py-6 px-8 rounded-lg shadow-neon-strong group"
              onClick={() => navigate('/dashboard')}
            >
              Start Creating For Free 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Social proof section */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <Avatar key={i} className="w-8 h-8 border-2 border-cyber-darker ring-2 ring-cyber-blue/50">
                  <AvatarImage src={`https://avatar.vercel.sh/${i}`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-cyber-blue/80">
              Join thousands of content creators
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};