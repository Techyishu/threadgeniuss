import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-cyber-dark text-white">
      <Hero />
      <Process />
      <Pricing />
      <Footer />
    </main>
  );
};

export default Index;