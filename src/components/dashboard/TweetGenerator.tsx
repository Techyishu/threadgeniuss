import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProFeatures } from "./ProFeatures";
import { useProStatus } from "@/hooks/useProStatus";

interface TweetGeneratorProps {
  onTweetGenerated: (tweet: string | null) => void;
}

export const TweetGenerator = ({ onTweetGenerated }: TweetGeneratorProps) => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState("professional");
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

  const handleGenerate = async () => {
    try {
      if (!youtubeLink) {
        throw new Error('Please enter a YouTube URL');
      }

      if (!isValidYoutubeUrl(youtubeLink)) {
        throw new Error('Please enter a valid YouTube URL');
      }

      setIsGenerating(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please sign in to generate tweets');
      }

      const { data, error } = await supabase.functions.invoke('generate-tweet', {
        body: { 
          youtubeUrl: youtubeLink,
          tone: isPro ? tone : 'professional',
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate tweet');
      }

      if (!data || !data.tweet) {
        throw new Error('Invalid response from server');
      }

      onTweetGenerated(data.tweet.content);

      toast({
        title: "Tweet generated successfully!",
        description: "Your tweet is ready to be shared.",
      });
    } catch (error) {
      console.error('Error generating tweet:', error);
      toast({
        title: "Error",
        description: error.message || 'An unexpected error occurred',
        variant: "destructive",
      });
      onTweetGenerated(null);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-cyber-purple/20 shadow-lg">
      <div className="space-y-4">
        <Input
          type="url"
          placeholder="Paste YouTube URL here"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className="bg-white border-cyber-purple/30 text-gray-900 placeholder:text-gray-500 h-12"
        />
        
        {isPro && (
          <ProFeatures 
            tone={tone}
            setTone={setTone}
            threadSize={undefined}
            setThreadSize={undefined}
          />
        )}

        <Button
          onClick={handleGenerate}
          disabled={!youtubeLink || isGenerating}
          className="w-full bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 transition-opacity h-12 text-white font-medium"
        >
          {isGenerating ? 'Generating...' : 'Generate Tweet'}
        </Button>
      </div>
    </div>
  );
};