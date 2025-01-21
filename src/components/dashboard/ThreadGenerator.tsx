import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ThreadGeneratorProps {
  onThreadGenerated: (thread: string | null) => void;
}

export const ThreadGenerator = ({ onThreadGenerated }: ThreadGeneratorProps) => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState("professional");
  const [threadSize, setThreadSize] = useState("medium");
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

  const handleGenerate = async () => {
    if (!youtubeLink) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGenerating(true);
      onThreadGenerated(null);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please sign in to generate threads');
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
          tone: tone,
          threadSize: threadSize
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

      await queryClient.invalidateQueries({ queryKey: ['profile'] });

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
      queryClient.invalidateQueries({ queryKey: ['threads'] });
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
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <Input
            type="text"
            placeholder="Enter YouTube video URL"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            className="w-full bg-white text-gray-900"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="w-full sm:w-[140px] bg-white text-gray-900">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="humorous">Humorous</SelectItem>
              <SelectItem value="educational">Educational</SelectItem>
            </SelectContent>
          </Select>
          <Select value={threadSize} onValueChange={setThreadSize}>
            <SelectTrigger className="w-full sm:w-[140px] bg-white text-gray-900">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (5)</SelectItem>
              <SelectItem value="medium">Medium (10)</SelectItem>
              <SelectItem value="long">Long (15)</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white whitespace-nowrap"
          >
            {isGenerating ? "Generating..." : "Generate Thread"}
          </Button>
        </div>
      </div>
    </div>
  );
};