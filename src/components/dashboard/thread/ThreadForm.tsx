import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { ProControls } from "./ProControls";
import { ContentTypeButtons } from "./ContentTypeButtons";

interface ThreadFormProps {
  profileData: any;
  isGenerating: boolean;
  onGenerate: (input: string, tone: string, threadSize: string, contentType: string) => void;
  onContentTypeChange: (type: string) => void;
}

export const ThreadForm = ({ profileData, isGenerating, onGenerate, onContentTypeChange }: ThreadFormProps) => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [threadSize, setThreadSize] = useState("medium");
  const [contentType, setContentType] = useState("thread");

  const handleContentTypeChange = (type: string) => {
    setContentType(type);
    onContentTypeChange(type);
    // Reset inputs when switching content types
    setYoutubeLink("");
    setTopic("");
  };

  const handleSubmit = () => {
    const input = contentType === 'thread' ? youtubeLink : topic;
    onGenerate(input, tone, threadSize, contentType);
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
      {profileData?.is_pro && (
        <ContentTypeButtons
          selectedType={contentType}
          onSelect={handleContentTypeChange}
        />
      )}
      
      {contentType === 'thread' ? (
        <Input
          type="url"
          placeholder="Paste YouTube URL here (e.g., youtube.com/watch?v=xxxxx or youtu.be/xxxxx)"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className="bg-[#0A0F1E] border-cyber-blue/30 text-white placeholder:text-gray-500 h-12"
        />
      ) : (
        <Input
          type="text"
          placeholder="Enter your topic (e.g., Benefits of meditation, Future of AI)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="bg-[#0A0F1E] border-cyber-blue/30 text-white placeholder:text-gray-500 h-12"
        />
      )}
      
      {profileData?.is_pro && (
        <ProControls 
          tone={tone} 
          setTone={setTone} 
          threadSize={threadSize} 
          setThreadSize={setThreadSize}
          contentType={contentType}
        />
      )}

      <Button
        onClick={handleSubmit}
        disabled={
          contentType === 'thread' 
            ? (!youtubeLink || isGenerating || !isValidYoutubeUrl(youtubeLink))
            : (!topic || isGenerating)
        }
        className="w-full bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 transition-opacity h-12 text-white font-medium"
      >
        {isGenerating ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </div>
        ) : (
          `Generate ${contentType === 'thread' ? 'Thread' : 'Long Tweet'}`
        )}
      </Button>
    </div>
  );
};