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
    <section className="relative py-12 sm:py-20 bg-[#0A0F1E]">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-[#0A0F1E]/90 to-blue-900/20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 100%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)`
          }}
        />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-cyber-blue/10 flex items-center justify-center mb-6 text-cyber-blue group-hover:text-cyber-purple transition-colors duration-300 relative">
                {step.icon}
                <div className="absolute -inset-2 bg-cyber-blue/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-sm sm:text-base text-slate-400">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[calc(100%-4rem)] h-[2px] bg-gradient-to-r from-cyber-blue to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};