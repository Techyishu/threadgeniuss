import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Process } from "@/components/Process";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <main className="min-h-screen bg-cyber-dark text-white">
      <Hero />
      <Dashboard />
      <Process />
      <Features />
    </main>
  );
};

export default Index;