import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useProStatus = () => {
  const [isPro, setIsPro] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          setIsPro(data.is_pro);
        } else {
          // Handle case where profile doesn't exist
          toast({
            title: "Error",
            description: "User profile not found. Please try logging out and back in.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching pro status:', error);
        toast({
          title: "Error",
          description: "Failed to fetch pro status. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchProStatus();
  }, [toast]);

  return { isPro };
};