import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";

const Index = () => {
  return (
    <main className="min-h-screen bg-cyber-dark text-white">
      <Hero />
      <Process />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;