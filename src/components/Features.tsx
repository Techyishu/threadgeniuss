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
    <section className="py-12 sm:py-20 bg-cyber-dark">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 bg-clip-text text-transparent bg-glow-gradient">
          Powerful Features for Content Creators
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group p-6 rounded-lg border border-cyber-blue/20 bg-cyber-dark/50 hover:border-cyber-purple/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/5 to-cyber-purple/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-cyber-blue/10 flex items-center justify-center mb-4 text-cyber-blue group-hover:text-cyber-purple transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};