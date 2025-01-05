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
    <section className="relative py-20 bg-cyber-darker">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(51, 195, 240, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-white font-orbitron">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group p-6 rounded-lg border border-cyber-blue/20 bg-cyber-dark/50 backdrop-blur-sm hover:border-cyber-blue/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/5 to-cyber-purple/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-cyber-blue/10 flex items-center justify-center mb-4 text-cyber-blue group-hover:text-cyber-purple transition-colors duration-300">
                  {step.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white font-orbitron">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 font-rajdhani">{step.description}</p>
              </div>
              
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