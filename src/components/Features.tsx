import { Brain, Clock, Wand2 } from "lucide-react";

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Summarization",
    description: "Our advanced AI understands context and extracts key insights from any video.",
  },
  {
    icon: <Wand2 className="w-6 h-6" />,
    title: "Custom Thread Styles",
    description: "Adjust tone and style to match your Twitter voice perfectly.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Save Hours of Work",
    description: "Convert hour-long videos into thread-ready content in minutes.",
  },
];

export const Features = () => {
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
          Powerful Features for Everyone
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group p-6 rounded-lg border border-[#1A1F2C]/20 bg-white hover:border-[#1A1F2C]/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F2C]/5 to-[#403E43]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#1A1F2C]/10 flex items-center justify-center mb-4 text-[#1A1F2C] group-hover:text-[#403E43] transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#1A1F2C]">{feature.title}</h3>
                <p className="text-sm sm:text-base text-[#403E43]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};