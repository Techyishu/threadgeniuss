import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ThreadForm } from "./thread/ThreadForm";

interface ThreadGeneratorProps {
  onThreadGenerated: (thread: string | null) => void;
  onContentTypeChange: (type: string) => void;
  selectedContentType: string;
}

export const ThreadGenerator = ({ 
  onThreadGenerated, 
  onContentTypeChange,
  selectedContentType 
}: ThreadGeneratorProps) => {
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

  const handleGenerate = async (
    input: string, 
    tone: string, 
    threadSize: string,
    contentType: string,
    subreddit?: string,
    postType?: string
  ) => {
    try {
      setIsGenerating(true);
      onThreadGenerated(null);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please sign in to generate content');
      }

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

      let content;
      if (contentType === 'thread') {
        console.log('Processing YouTube video...');
        const { data: processData, error: processError } = await supabase.functions.invoke('process-youtube', {
          body: { youtubeUrl: input },
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });

        if (processError || !processData?.transcript) {
          console.error('Error processing video:', processError);
          throw new Error(processError?.message || 'Failed to process video');
        }

        console.log('Generating thread...');
        const { data, error } = await supabase.functions.invoke('generate-thread', {
          body: { 
            youtubeUrl: input,
            transcript: processData.transcript,
            tone: profileData?.is_pro ? tone : 'professional',
            threadSize: profileData?.is_pro ? threadSize : 'short',
            contentType,
            subreddit,
            postType
          },
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });

        if (error || !data?.thread) {
          throw new Error(error?.message || 'Failed to generate content');
        }

        content = data.thread;
      } else {
        // Generate content for Reddit post or long tweet directly from topic
        console.log('Generating content from topic...');
        const { data, error } = await supabase.functions.invoke('generate-thread', {
          body: { 
            topic: input,
            tone: profileData?.is_pro ? tone : 'professional',
            contentType,
            subreddit,
            postType
          },
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });

        if (error || !data?.thread) {
          throw new Error(error?.message || 'Failed to generate content');
        }

        content = data.thread;
      }

      // Save the generated content
      const { error: saveError } = await supabase
        .from('threads')
        .insert({
          youtube_url: contentType === 'thread' ? input : null,
          content: content.content,
          title: content.title,
          status: 'generated',
          user_id: session.user.id,
          content_type: contentType,
          subreddit: subreddit || null,
          post_type: postType || null
        });

      if (saveError) {
        console.error('Error saving content:', saveError);
        throw new Error('Failed to save content');
      }

      await queryClient.invalidateQueries({ queryKey: ['profile'] });

      if (!profileData?.is_pro && profileData?.threads_count > 0) {
        const remainingThreads = Math.max(0, (profileData.threads_count - 1));
        toast({
          title: `Content generated successfully!`,
          description: remainingThreads > 0 
            ? `You have ${remainingThreads} thread${remainingThreads !== 1 ? 's' : ''} remaining.`
            : "This was your last free thread. Upgrade to Pro for unlimited threads!",
        });
      } else {
        toast({
          title: "Content generated successfully!",
          description: "Your content is ready to be shared.",
        });
      }

      onThreadGenerated(content.content);
    } catch (error) {
      console.error('Error generating content:', error);
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
    <div className="bg-[#222222] p-4 sm:p-6 rounded-lg border border-gray-800">
      <ThreadForm 
        profileData={profileData}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
        onContentTypeChange={onContentTypeChange}
        selectedContentType={selectedContentType}
      />
    </div>
  );
};