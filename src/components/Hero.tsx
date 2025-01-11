import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0A0F1E] px-4 sm:px-6 py-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E] to-[#1A1F2C] opacity-90" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Turn Clicks into
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Conversions
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-xl">
              With our platform, master the art of online persuasion as we harness data, 
              creativity, and technology to transform your digital engagement strategy.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8"
                onClick={() => navigate('/dashboard')}
              >
                Start Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Partner Logos */}
            <div className="pt-12">
              <p className="text-sm text-gray-500 mb-4">Powered by</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center opacity-70">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-800 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Stats and Images Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Stats Cards */}
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 p-4 rounded-2xl border border-orange-500/20">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-orange-500/20 border-2 border-orange-500/30"
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-white">124K+</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Monthly Active Users</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-2xl border border-blue-500/20">
                <div className="text-2xl font-bold text-white">98%</div>
                <p className="text-sm text-gray-400">Satisfaction Rate</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-4 rounded-2xl border border-purple-500/20">
                <div className="text-2xl font-bold text-white">14K</div>
                <p className="text-sm text-gray-400">Successful Projects</p>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 p-4 rounded-2xl border border-indigo-500/20">
                <div className="text-2xl font-bold text-white">5.8K</div>
                <p className="text-sm text-gray-400">Clients Served</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};