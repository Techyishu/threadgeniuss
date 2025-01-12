import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const ThreadsCounter = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    }
  });

  if (!profile) return null;

  return (
    <div className="text-sm text-gray-400">
      {profile.is_pro ? (
        <span>Unlimited threads available</span>
      ) : (
        <span>{profile.threads_count} threads remaining</span>
      )}
    </div>
  );
};