import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProFeatures } from "./ProFeatures";
import { useProStatus } from "@/hooks/useProStatus";

interface ThreadGeneratorProps {
  onThreadGenerated: (thread: string | null) => void;
}

export const ThreadGenerator = ({ onThreadGenerated }: ThreadGeneratorProps) => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState("professional");
  const [threadSize, setThreadSize] = useState("medium");
  const { isPro } = useProStatus();
  const { toast } = useToast();

  const isValidYoutubeUrl = (url: string) => {
    const patterns = [
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})(&.*)?$/,
      /^(https?:\/\/)?(www\.)?(youtu\.be\/)([a-zA-Z0-9_-]{11})(\?.*)?$/,
      /^(https?:\/\/)?(www\.)?(youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(\?.*)?$/,
      /^(https?:\/\/)?(www\.)?(youtube\.com\/v\/)([a-zA-Z0-9_-]{11})(\?.*)?$/,
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  const checkRateLimit = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { error } = await supabase.functions.invoke('rate-limiter', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
      
      if (error) throw error;
      return true;
    } catch (error) {
      if (error.message === 'Rate limit exceeded') {
        throw new Error('Too many requests. Please try again later.');
      }
      throw error;
    }
  };

  const checkThreadsLimit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('threads_count, is_pro')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      
      // If no profile is found, it means the trigger hasn't completed yet
      if (!profile) {
        throw new Error('Your profile is being set up. Please try again in a few seconds.');
      }

      if (!profile.is_pro && profile.threads_count <= 0) {
        throw new Error('You have reached your free plan limit. Please upgrade to Pro for unlimited threads.');
      }

      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleGenerate = async () => {
    try {
      if (!youtubeLink) {
        throw new Error('Please enter a YouTube URL');
      }

      if (!isValidYoutubeUrl(youtubeLink)) {
        throw new Error('Please enter a valid YouTube URL (e.g., youtube.com/watch?v=xxxxx or youtu.be/xxxxx)');
      }

      setIsGenerating(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please sign in to generate threads');
      }

      await checkRateLimit();
      await checkThreadsLimit();

      const { data, error } = await supabase.functions.invoke('generate-thread', {
        body: { 
          youtubeUrl: youtubeLink,
          tone: isPro ? tone : 'professional',
          threadSize: isPro ? threadSize : 'medium'
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate thread');
      }

      if (!data || !data.thread) {
        throw new Error('Invalid response from server');
      }

      onThreadGenerated(data.thread.content);

      toast({
        title: "Thread generated successfully!",
        description: "Your thread is ready to be shared.",
      });
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-[#1A1F2C]">Generate Thread</h2>
          <p className="text-sm text-gray-500">Enter a YouTube URL to create your thread</p>
        </div>

        <Input
          type="url"
          placeholder="Paste YouTube URL here (e.g., youtube.com/watch?v=xxxxx or youtu.be/xxxxx)"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-12 focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
        />
        
        {isPro && (
          <ProFeatures 
            tone={tone}
            setTone={setTone}
            threadSize={threadSize}
            setThreadSize={setThreadSize}
          />
        )}

        <Button
          onClick={handleGenerate}
          disabled={!youtubeLink || isGenerating}
          className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors h-12 text-white font-medium rounded-lg"
        >
          {isGenerating ? 'Generating...' : 'Generate Thread'}
        </Button>
      </div>
    </div>
  );
};