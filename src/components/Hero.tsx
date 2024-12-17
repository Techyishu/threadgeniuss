import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-dark">
      {/* Animated background */}
      <div className="absolute inset-0 bg-cyber-gradient opacity-20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNNTQgMGg2djZoLTZWMHptNiA2aDZ2NmgtNlY2em0tNiA2aDZ2NmgtNnYtNnptNiA2aDZ2NmgtNnYtNnptLTYgNmg2djZoLTZ2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-glow-gradient animate-glow">
              Transform Videos into Viral Threads in Seconds!
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl">
              Turn any YouTube video into an engaging Twitter thread effortlessly with the power of AI.
            </p>
            <Button
              size="lg"
              className="bg-cyber-blue hover:bg-cyber-purple transition-all duration-300 transform hover:scale-105 animate-float"
            >
              Generate Your First Thread <ArrowRight className="ml-2" />
            </Button>
          </div>

          {/* Right side - Split screen preview */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border border-cyber-blue/20">
              <div className="grid grid-cols-2 gap-1 bg-cyber-dark/90 p-4">
                <div className="rounded-lg overflow-hidden">
                  <div className="aspect-video bg-cyber-dark border border-cyber-blue/30 rounded-lg flex items-center justify-center">
                    <div className="text-cyber-blue">YouTube Preview</div>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <div className="aspect-video bg-cyber-dark border border-cyber-purple/30 rounded-lg flex items-center justify-center">
                    <div className="text-cyber-purple">Thread Preview</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};