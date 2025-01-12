import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProControls } from "./ProControls";
import { useToast } from "@/hooks/use-toast";
import { ThreadFormProps } from "@/types/thread";

export const ThreadForm = ({ 
  profileData, 
  isGenerating, 
  onGenerate 
}: ThreadFormProps) => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [tone, setTone] = useState("professional");
  const [threadSize, setThreadSize] = useState("medium");
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      if (!youtubeLink) {
        throw new Error('Please enter a YouTube URL');
      }

      if (!isValidYoutubeUrl(youtubeLink)) {
        throw new Error('Please enter a valid YouTube URL (e.g., youtube.com/watch?v=xxxxx or youtu.be/xxxxx)');
      }

      onGenerate(youtubeLink, tone, threadSize);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isValidYoutubeUrl = (url: string) => {
    const patterns = [
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})(&.*)?$/,
      /^(https?:\/\/)?(www\.)?(youtu\.be\/)([a-zA-Z0-9_-]{11})(\?.*)?$/,
      /^(https?:\/\/)?(www\.)?(youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(\?.*)?$/,
      /^(https?:\/\/)?(www\.)?(youtube\.com\/v\/)([a-zA-Z0-9_-]{11})(\?.*)?$/,
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  return (
    <div className="space-y-4">
      <Input
        type="url"
        placeholder="Paste YouTube URL here (e.g., youtube.com/watch?v=xxxxx or youtu.be/xxxxx)"
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
        className="bg-[#0A0F1E] border-cyber-blue/30 text-white placeholder:text-gray-500 h-12"
      />
      
      {profileData?.is_pro && (
        <ProControls 
          tone={tone} 
          setTone={setTone} 
          threadSize={threadSize} 
          setThreadSize={setThreadSize} 
        />
      )}

      <Button
        onClick={handleSubmit}
        disabled={!youtubeLink || isGenerating}
        className="w-full bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 transition-opacity h-12 text-white font-medium"
      >
        {isGenerating ? 'Generating...' : 'Generate Thread'}
      </Button>

      {!profileData?.is_pro && (
        <p className="text-sm text-gray-400 text-center">
          You have {Math.min(profileData?.threads_count || 0, 5)} free threads remaining.{' '}
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
  );
};