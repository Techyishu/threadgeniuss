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
import { useQuery } from "@tanstack/react-query";

interface ThreadGeneratorProps {
  onThreadGenerated: (thread: string | null) => void;
}

export const ThreadGenerator = ({ onThreadGenerated }: ThreadGeneratorProps) => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState("professional");
  const [threadSize, setThreadSize] = useState("medium");
  const { toast } = useToast();

  // Fetch user profile data
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
      onThreadGenerated(null);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please sign in to generate threads');
      }

      // Check if user has threads remaining or is pro
      if (!profileData?.is_pro && profileData?.threads_count <= 0) {
        throw new Error('You have used all your free threads. Upgrade to Pro for unlimited threads!');
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

      // Generate thread
      console.log('Generating thread from transcript...');
      const { data, error } = await supabase.functions.invoke('generate-thread', {
        body: { 
          youtubeUrl: youtubeLink,
          transcript: processData.transcript,
          tone: profileData?.is_pro ? tone : 'professional',
          threadSize: profileData?.is_pro ? threadSize : 'medium'
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

      // Save thread
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
    <div className="bg-[#1A1F2C] p-4 sm:p-6 rounded-lg border border-cyber-blue/20 shadow-lg">
      <div className="space-y-4">
        <Input
          type="url"
          placeholder="Paste YouTube URL here (e.g., youtube.com/watch?v=xxxxx or youtu.be/xxxxx)"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className="bg-[#0A0F1E] border-cyber-blue/30 text-white placeholder:text-gray-500 h-12"
        />
        
        {profileData?.is_pro && (
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
        )}

        <Button
          onClick={handleGenerate}
          disabled={!youtubeLink || isGenerating}
          className="w-full bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 transition-opacity h-12 text-white font-medium"
        >
          {isGenerating ? 'Generating...' : 'Generate Thread'}
        </Button>

        {!profileData?.is_pro && (
          <p className="text-sm text-gray-400 text-center">
            You have {profileData?.threads_count || 0} free threads remaining.{' '}
            <Button
              variant="link"
              className="text-cyber-blue hover:text-cyber-purple p-0"
              onClick={() => window.location.href = '/dashboard?showPricing=true'}
            >
              Upgrade to Pro
            </Button>
          </p>
        )}
      </div>
    </div>
  );
};