import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const ThreadsCounter = () => {
  const [threadsCount, setThreadsCount] = useState<number>(5);
  const [isPro, setIsPro] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('threads_count, is_pro')
        .eq('id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      
      if (data) {
        setThreadsCount(data.threads_count);
        setIsPro(data.is_pro);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch user data. Please try again.",
      });
    }
  };

  return (
    <div className="px-4 py-2 bg-cyber-blue/10 rounded-md">
      <p className="text-sm text-black font-medium">Threads Remaining</p>
      <p className="text-xl font-bold text-black">
        {isPro ? "Unlimited" : threadsCount}
      </p>
    </div>
  );
};