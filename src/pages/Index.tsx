import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Process } from "@/components/Process";
import { PricingSection } from "@/components/PricingSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-cyber-dark text-white">
      <Hero />
      <Process />
      <Features />
      <PricingSection />
    </main>
  );
};

export default Index;