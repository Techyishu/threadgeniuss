import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
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
      onThreadGenerated(null); // Clear any previous thread

      // First check if we're authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please sign in to generate threads');
      }

      // Check rate limit first
      const { error: rateLimitError } = await supabase.functions.invoke('rate-limiter', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (rateLimitError) {
        throw new Error(rateLimitError.message || 'Rate limit exceeded');
      }

      // If rate limit check passes, generate the thread
      const { data, error } = await supabase.functions.invoke('generate-thread', {
        body: { 
          youtubeUrl: youtubeLink,
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

      // Save the generated thread to the database
      const { error: saveError } = await supabase
        .from('threads')
        .insert({
          youtube_url: youtubeLink,
          content: data.thread.content,
          title: data.thread.title,
          status: 'generated',
          user_id: session.user.id // Make sure to include the user_id
        });

      if (saveError) {
        console.error('Error saving thread:', saveError);
        throw new Error('Failed to save thread');
      }

      onThreadGenerated(data.thread.content);

      toast({
        title: "Thread generated and saved successfully!",
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
    <div className="space-y-6">
      <Input
        type="url"
        placeholder="YouTube Video URL"
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
        className="w-full bg-black border-gray-800 text-white placeholder:text-gray-500"
      />
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Number of tweets</label>
          <Select value={threadSize} onValueChange={setThreadSize}>
            <SelectTrigger className="w-full bg-black border-gray-800 text-white">
              <SelectValue placeholder="Select thread size" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-800">
              <SelectItem value="short">Short (5 tweets)</SelectItem>
              <SelectItem value="medium">Medium (10 tweets)</SelectItem>
              <SelectItem value="long">Long (15 tweets)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Tone</label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="w-full bg-black border-gray-800 text-white">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-800">
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="humorous">Humorous</SelectItem>
              <SelectItem value="educational">Educational</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={!youtubeLink || isGenerating}
        className="w-full bg-white hover:bg-gray-100 text-black font-medium h-12"
      >
        {isGenerating ? 'Generating...' : 'Generate Thread'}
      </Button>
    </div>
  );
};
