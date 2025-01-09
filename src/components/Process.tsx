import { Link2, Sparkles, Share2 } from "lucide-react";

const steps = [
  {
    icon: <Link2 className="w-6 h-6" />,
    title: "Paste YouTube Link",
    description: "Simply paste the URL of any YouTube video you want to convert",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI Summarizes Content",
    description: "Our AI analyzes and extracts the most important points",
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Get Twitter-Ready Thread",
    description: "Receive a perfectly formatted thread ready to share",
  },
];

export const Process = () => {
  return (
    <section className="relative py-20 bg-cyber-darker overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-neon-grid bg-[length:50px_50px] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker via-cyber-dark to-cyber-darker" />

      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 text-white animate-neonPulse">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-cyber-blue/10 flex items-center justify-center mb-6 text-cyber-blue group-hover:text-cyber-purple transition-colors duration-300 shadow-neon relative">
                {step.icon}
                <div className="absolute -inset-2 bg-cyber-blue/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-cyber-blue transition-colors">
                {step.title}
              </h3>
              <p className="text-cyber-blue/80">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[calc(100%-4rem)] h-[2px] bg-gradient-to-r from-cyber-blue to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};