import { Dashboard } from "@/components/Dashboard";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DashboardPage = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const confirmed = searchParams.get('confirmed');
    if (confirmed === 'true') {
      toast({
        title: "Email confirmed",
        description: "Your email has been successfully confirmed. Welcome to ThreadGenius!",
      });
    }
  }, [searchParams, toast]);

  return <Dashboard />;
};

export default DashboardPage;