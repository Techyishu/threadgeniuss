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
    <section className="relative py-12 sm:py-20 bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#1A1F2C] opacity-[0.02]" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1A1F2C 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.1
        }} />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-[#1A1F2C]">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#1A1F2C]/10 flex items-center justify-center mb-6 text-[#1A1F2C] relative">
                {step.icon}
                <div className="absolute -inset-2 bg-[#1A1F2C]/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#1A1F2C]">{step.title}</h3>
              <p className="text-sm sm:text-base text-[#403E43]">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[calc(100%-4rem)] h-[2px] bg-gradient-to-r from-[#1A1F2C] to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};