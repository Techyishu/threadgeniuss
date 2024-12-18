import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useProStatus = () => {
  const [isPro, setIsPro] = useState(false);
  const { toast } = useToast();

  const fetchProStatus = useCallback(async () => {
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
      }
    } catch (error) {
      console.error('Error fetching pro status:', error);
    }
  }, []);

  useEffect(() => {
    fetchProStatus();
  }, [fetchProStatus]);

  return { isPro };
};