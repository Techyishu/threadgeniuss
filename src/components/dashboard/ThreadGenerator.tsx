import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ThreadForm } from "./thread/ThreadForm";

interface ThreadGeneratorProps {
  onThreadGenerated: (thread: string | null) => void;
}

export const ThreadGenerator = ({ onThreadGenerated }: ThreadGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profileData } = useQuery({
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

  const handleGenerate = async (youtubeLink: string, tone: string, threadSize: string) => {
    try {
      setIsGenerating(true);
      onThreadGenerated(null);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please sign in to generate threads');
      }

      // Check if user has threads remaining before proceeding
      if (!profileData?.is_pro && (profileData?.threads_count || 0) <= 0) {
        toast({
          title: "No threads remaining",
          description: "You've used all your free threads. Upgrade to Pro for unlimited threads!",
          variant: "destructive",
        });
        window.location.href = '/dashboard?showPricing=true';
        return;
      }

      const { error: rateLimitError } = await supabase.functions.invoke('rate-limiter', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (rateLimitError) {
        throw new Error(rateLimitError.message || 'Rate limit exceeded');
      }

      console.log('Processing YouTube video...');
      const { data: processData, error: processError } = await supabase.functions.invoke('process-youtube', {
        body: { youtubeUrl: youtubeLink },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (processError || !processData?.transcript) {
        console.error('Error processing video:', processError);
        throw new Error(processError?.message || 'Failed to process video');
      }

      console.log('Generating thread from transcript...');
      const { data, error } = await supabase.functions.invoke('generate-thread', {
        body: { 
          youtubeUrl: youtubeLink,
          transcript: processData.transcript,
          tone: profileData?.is_pro ? tone : 'professional',
          threadSize: profileData?.is_pro ? threadSize : 'short'
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        console.error('Error from generate-thread:', error);
        throw new Error(error.message || 'Failed to generate thread');
      }

      if (!data || !data.thread) {
        throw new Error('Invalid response from server');
      }

      // Save the generated thread
      const { error: saveError } = await supabase
        .from('threads')
        .insert({
          youtube_url: youtubeLink,
          content: data.thread.content,
          title: processData.title || data.thread.title,
          status: 'generated',
          user_id: session.user.id
        });

      if (saveError) {
        console.error('Error saving thread:', saveError);
        throw new Error('Failed to save thread');
      }

      // Force a refresh of the profile data to get the updated thread count
      await queryClient.invalidateQueries({ queryKey: ['profile'] });

      // Show remaining threads notification for free users
      if (!profileData?.is_pro && profileData?.threads_count > 0) {
        const remainingThreads = Math.max(0, (profileData.threads_count - 1));
        toast({
          title: `Thread generated successfully!`,
          description: remainingThreads > 0 
            ? `You have ${remainingThreads} thread${remainingThreads !== 1 ? 's' : ''} remaining.`
            : "This was your last free thread. Upgrade to Pro for unlimited threads!",
        });
      } else {
        toast({
          title: "Thread generated successfully!",
          description: "Your thread is ready to be shared.",
        });
      }

      onThreadGenerated(data.thread.content);
    } catch (error) {
      console.error('Error generating thread:', error);
      toast({
        title: "Error",
        description: error.message || 'An unexpected error occurred',
        variant: "destructive",
      });
      onThreadGenerated(null);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#1A1F2C] p-4 sm:p-6 rounded-lg border border-cyber-blue/20 shadow-lg">
      <ThreadForm 
        profileData={profileData}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
      />
    </div>
  );
};
