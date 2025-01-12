import { User2, Sparkles, Mail, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <User2 className="w-6 h-6" />,
    title: "Start",
    description: "We provide the required customer details to AI",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI Processing",
    description: "The AI process the details and writes a testimonial",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Review",
    description: "The testimonial is sent to the customer for review",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Approved",
    description: "Once Approved, Congratulations you have got a new testimonial",
  }
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
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-16 text-white flex items-center justify-center gap-4">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-green-500"></span>
          How It Works
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-green-500"></span>
        </h2>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative flex gap-8 pb-16 last:pb-0">
              {/* Vertical Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-[27px] top-12 bottom-0 w-[2px] bg-gradient-to-b from-green-500 to-transparent" />
              )}
              
              {/* Icon Circle */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-black border-2 border-green-500 flex items-center justify-center text-green-500 relative z-10">
                  {step.icon}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-2">
                <h3 className="text-lg font-semibold mb-2 text-green-500">{step.title}</h3>
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-green-500/20">
                  <p className="text-slate-300">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};