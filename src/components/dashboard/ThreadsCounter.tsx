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

  // Show either "Unlimited" for pro users or the remaining count (max 5) for free users
  const displayCount = profile.is_pro 
    ? "Unlimited threads available" 
    : `${Math.min(profile.threads_count, 5)} threads remaining`;

  return (
    <div className="text-sm text-gray-400">
      <span>{displayCount}</span>
    </div>
  );
};