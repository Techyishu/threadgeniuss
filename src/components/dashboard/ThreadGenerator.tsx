import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
  const [isPro, setIsPro] = useState(false);
  const { toast } = useToast();

  // Fetch user's pro status
  const fetchProStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('is_pro')
        .eq('id', user.id)
        .single();

      if (data) {
        setIsPro(data.is_pro);
      }
    } catch (error) {
      console.error('Error fetching pro status:', error);
    }
  };

  useState(() => {
    fetchProStatus();
  }, []);

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
      const { error } = await supabase.functions.invoke('rate-limiter');
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
        .single();

      if (profileError) throw profileError;

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

      // Check both rate limit and threads limit
      await checkRateLimit();
      await checkThreadsLimit();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please sign in to generate threads');
      }

      const { data, error } = await supabase.functions.invoke('generate-thread', {
        body: { 
          youtubeUrl: youtubeLink,
          tone: isPro ? tone : 'professional',
          threadSize: isPro ? threadSize : 'medium'
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
    <div className="bg-gradient-to-r from-cyber-dark to-cyber-dark/50 p-4 sm:p-6 rounded-lg border border-cyber-purple/20 backdrop-blur-sm">
      <div className="space-y-4">
        <Input
          type="url"
          placeholder="Paste YouTube URL here (e.g., youtube.com/watch?v=xxxxx or youtu.be/xxxxx)"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className="bg-cyber-dark/60 border-cyber-purple/30 text-white placeholder:text-gray-500 h-12"
        />
        
        {isPro && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Tone</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-cyber-dark/60 border-cyber-purple/30 text-white">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Thread Size</label>
              <Select value={threadSize} onValueChange={setThreadSize}>
                <SelectTrigger className="bg-cyber-dark/60 border-cyber-purple/30 text-white">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (3 tweets)</SelectItem>
                  <SelectItem value="medium">Medium (5 tweets)</SelectItem>
                  <SelectItem value="long">Long (7 tweets)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={!youtubeLink || isGenerating}
          className="w-full bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 transition-opacity h-12 text-white font-medium"
        >
          {isGenerating ? 'Generating...' : 'Generate Thread'}
        </Button>
      </div>
    </div>
  );
};