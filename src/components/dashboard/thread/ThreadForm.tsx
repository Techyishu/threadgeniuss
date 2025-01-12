import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { ProControls } from "./ProControls";
import { ContentTypeSelector } from "./ContentTypeSelector";

interface ThreadFormProps {
  profileData: any;
  isGenerating: boolean;
  onGenerate: (youtubeLink: string, tone: string, threadSize: string, contentType: string, subreddit?: string, postType?: string) => void;
}

export const ThreadForm = ({ profileData, isGenerating, onGenerate }: ThreadFormProps) => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [tone, setTone] = useState("professional");
  const [threadSize, setThreadSize] = useState("medium");
  const [contentType, setContentType] = useState("thread");
  const [subreddit, setSubreddit] = useState("");
  const [postType, setPostType] = useState("text");

  const handleSubmit = () => {
    onGenerate(youtubeLink, tone, threadSize, contentType, subreddit, postType);
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
        <>
          <ContentTypeSelector 
            contentType={contentType} 
            setContentType={setContentType}
            subreddit={subreddit}
            setSubreddit={setSubreddit}
            postType={postType}
            setPostType={setPostType}
          />
          <ProControls 
            tone={tone} 
            setTone={setTone} 
            threadSize={threadSize} 
            setThreadSize={setThreadSize}
            contentType={contentType}
          />
        </>
      )}

      <Button
        onClick={handleSubmit}
        disabled={!youtubeLink || isGenerating || !isValidYoutubeUrl(youtubeLink)}
        className="w-full bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 transition-opacity h-12 text-white font-medium"
      >
        {isGenerating ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </div>
        ) : (
          `Generate ${contentType === 'thread' ? 'Thread' : contentType === 'reddit' ? 'Reddit Post' : 'Long Tweet'}`
        )}
      </Button>
    </div>
  );
};