import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ThreadGeneratorProps {
  onThreadGenerated: (thread: string | null) => void;
}

export const ThreadGenerator = ({ onThreadGenerated }: ThreadGeneratorProps) => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
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
        throw new Error('Please enter a valid YouTube URL (e.g., youtube.com/watch?v=xxxxx or youtu.be/xxxxx)');
      }

      setIsGenerating(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please sign in to generate threads');
      }

      const { data, error } = await supabase.functions.invoke('generate-thread', {
        body: { youtubeUrl: youtubeLink }
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