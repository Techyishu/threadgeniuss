import { useState, useRef } from "react";
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
import { Loader2, Volume2, VolumeX } from "lucide-react";

interface ThreadGeneratorProps {
  onThreadGenerated: (thread: string | null) => void;
}

export const ThreadGenerator = ({ onThreadGenerated }: ThreadGeneratorProps) => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState("professional");
  const [threadSize, setThreadSize] = useState("medium");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
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

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
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
      setIsProcessing(true);
      onThreadGenerated(null);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please sign in to generate threads');
      }

      // Check rate limit
      const { error: rateLimitError } = await supabase.functions.invoke('rate-limiter', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (rateLimitError) {
        throw new Error(rateLimitError.message || 'Rate limit exceeded');
      }

      // Process YouTube video
      const { data, error } = await supabase.functions.invoke('process-youtube', {
        body: { 
          youtubeUrl: youtubeLink,
          tone,
          threadSize
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        console.error('Error from process-youtube:', error);
        throw new Error(error.message || 'Failed to process video');
      }

      if (!data || !data.thread) {
        throw new Error('Invalid response from server');
      }

      // Create audio URL from base64
      if (data.audio) {
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))],
          { type: 'audio/mp3' }
        );
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      }

      // Save the generated thread
      const { error: saveError } = await supabase
        .from('threads')
        .insert({
          youtube_url: youtubeLink,
          content: data.thread.content,
          title: data.thread.title,
          status: 'generated',
          user_id: session.user.id
        });

      if (saveError) {
        console.error('Error saving thread:', saveError);
        throw new Error('Failed to save thread');
      }

      onThreadGenerated(data.thread.content);

      toast({
        title: "Thread generated successfully!",
        description: "Your thread is ready. You can now listen to the audio and review the generated content.",
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
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#1A1F2C] p-4 sm:p-6 rounded-lg border border-cyber-blue/20 shadow-lg">
      <div className="space-y-4">
        <Input
          type="url"
          placeholder="Paste YouTube URL here (e.g., youtube.com/watch?v=xxxxx or youtu.be/xxxxx)"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className="bg-[#0A0F1E] border-cyber-blue/30 text-white placeholder:text-gray-500 h-12"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Tone</label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="bg-[#0A0F1E] border-cyber-blue/30 text-white">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-cyber-blue/30">
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="humorous">Humorous</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Thread Size</label>
            <Select value={threadSize} onValueChange={setThreadSize}>
              <SelectTrigger className="bg-[#0A0F1E] border-cyber-blue/30 text-white">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-cyber-blue/30">
                <SelectItem value="short">Short (5 tweets)</SelectItem>
                <SelectItem value="medium">Medium (10 tweets)</SelectItem>
                <SelectItem value="long">Long (15 tweets)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {audioUrl && (
          <div className="mt-4 p-4 bg-[#0A0F1E] rounded-lg border border-cyber-blue/30">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAudio}
                className="text-gray-300 hover:text-white hover:bg-cyber-blue/10"
              >
                {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                {isPlaying ? 'Pause Audio' : 'Play Audio'}
              </Button>
            </div>
            <audio ref={audioRef} controls className="w-full mt-2" src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={!youtubeLink || isGenerating}
          className="w-full bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 transition-opacity h-12 text-white font-medium"
        >
          {isProcessing ? 'Processing...' : isGenerating ? 'Generating Thread...' : 'Generate Thread'}
        </Button>
      </div>
    </div>
  );
};