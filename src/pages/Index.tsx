import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Process } from "@/components/Process";

const Index = () => {
  return (
    <main className="min-h-screen bg-cyber-dark text-white">
      <Hero />
      <Process />
      <Features />
    </main>
  );
};

export default Index;