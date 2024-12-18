import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useProStatus = () => {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const fetchProStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', user.id)
          .maybeSingle();

        if (data) {
          setIsPro(data.is_pro);
        }
      } catch (error) {
        console.error('Error fetching pro status:', error);
      }
    };

    fetchProStatus();
  }, []);

  return { isPro };
};