import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const confirmed = searchParams.get('confirmed');
    if (confirmed === 'true') {
      toast({
        title: "Email confirmed",
        description: "Your email has been successfully confirmed. You can now sign in.",
      });
    }
  }, [searchParams, toast]);

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