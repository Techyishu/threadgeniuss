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
    <section className="relative py-20 bg-cyber-darker">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-neon-grid bg-[length:50px_50px] opacity-5" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-darker via-cyber-dark to-cyber-darker" />

      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-white animate-neonPulse">
          Powerful Features for Everyone
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group p-8 rounded-lg border border-cyber-blue/20 bg-cyber-darker/50 hover:border-cyber-blue/50 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/5 to-cyber-purple/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-cyber-blue/10 flex items-center justify-center mb-4 text-cyber-blue group-hover:text-cyber-purple transition-colors duration-300 shadow-neon">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-cyber-blue transition-colors">
                  {feature.title}
                </h3>
                <p className="text-cyber-blue/80">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};