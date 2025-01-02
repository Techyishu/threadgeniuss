import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-cyber-dark text-white">
      <Hero />
      <Process />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
};

export default Index;