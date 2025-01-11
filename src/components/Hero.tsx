import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F1E] px-4 sm:px-6">
      {/* Gradient background effect */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/90 to-blue-900/20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="container mx-auto relative z-10 pt-20 pb-32">
        <div className="max-w-[95%] md:max-w-4xl mx-auto text-center">
          {/* New service badge */}
          <div className="mb-8 inline-block">
            <span className="px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 rounded-full border border-blue-500/20">
              AI-Powered Thread Generation
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-[1.1] tracking-tight">
            Transform Your Videos into
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Viral Twitter Threads
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-12 mx-auto text-slate-400 max-w-2xl leading-relaxed">
            Turn any YouTube video into engaging Twitter threads in seconds. 
            Save hours of content creation with AI-powered automation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 text-lg py-6 px-8 rounded-lg shadow-lg shadow-blue-500/25"
              onClick={() => navigate('/dashboard')}
            >
              Start Creating For Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Social proof section */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <Avatar key={i} className="w-8 h-8 border-2 border-[#0A0F1E]">
                  <AvatarImage src={`https://avatar.vercel.sh/${i}`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-slate-400">
              Join thousands of content creators
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};