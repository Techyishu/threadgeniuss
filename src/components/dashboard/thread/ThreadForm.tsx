import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { ProControls } from "./ProControls";
import { ContentTypeSelector } from "./ContentTypeSelector";

interface ThreadFormProps {
  profileData: any;
  isGenerating: boolean;
  onGenerate: (input: string, tone: string, threadSize: string, contentType: string, subreddit?: string, postType?: string) => void;
  onContentTypeChange: (type: string) => void;
  selectedContentType: string;
}

export const ThreadForm = ({ 
  profileData, 
  isGenerating, 
  onGenerate, 
  onContentTypeChange,
  selectedContentType
}: ThreadFormProps) => {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("professional");
  const [threadSize, setThreadSize] = useState("medium");
  const [subreddit, setSubreddit] = useState("");
  const [postType, setPostType] = useState("text");

  const handleSubmit = () => {
    onGenerate(input, tone, threadSize, selectedContentType, subreddit, postType);
  };

  const getInputLabel = () => {
    switch (selectedContentType) {
      case 'thread':
        return "YouTube URL";
      case 'reddit':
        return "Topic for Reddit Post";
      case 'long_tweet':
        return "Topic for Long Tweet";
      default:
        return "Input";
    }
  };

  const getInputPlaceholder = () => {
    switch (selectedContentType) {
      case 'thread':
        return "Paste YouTube URL here (e.g., youtube.com/watch?v=xxxxx or youtu.be/xxxxx)";
      case 'reddit':
        return "Enter the topic you want to create a Reddit post about";
      case 'long_tweet':
        return "Enter the topic you want to create a long tweet about";
      default:
        return "Enter your input here";
    }
  };

  const isValidInput = () => {
    if (selectedContentType === 'thread') {
      const patterns = [
        /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})(&.*)?$/,
        /^(https?:\/\/)?(www\.)?(youtu\.be\/)([a-zA-Z0-9_-]{11})(\?.*)?$/,
        /^(https?:\/\/)?(www\.)?(youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(\?.*)?$/,
        /^(https?:\/\/)?(www\.)?(youtube\.com\/v\/)([a-zA-Z0-9_-]{11})(\?.*)?$/,
      ];
      return patterns.some(pattern => pattern.test(input));
    }
    return input.trim().length > 0;
  };

  return (
    <div className="space-y-4">
      {selectedContentType === 'reddit' ? (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">{getInputLabel()}</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={getInputPlaceholder()}
              className="bg-[#0A0F1E] border-cyber-blue/30 text-white placeholder:text-gray-500 min-h-[100px]"
            />
          </div>
          <ContentTypeSelector 
            contentType={selectedContentType}
            setContentType={onContentTypeChange}
            subreddit={subreddit}
            setSubreddit={setSubreddit}
            postType={postType}
            setPostType={setPostType}
          />
        </>
      ) : (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">{getInputLabel()}</label>
          {selectedContentType === 'long_tweet' ? (
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={getInputPlaceholder()}
              className="bg-[#0A0F1E] border-cyber-blue/30 text-white placeholder:text-gray-500 min-h-[100px]"
            />
          ) : (
            <Input
              type="url"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={getInputPlaceholder()}
              className="bg-[#0A0F1E] border-cyber-blue/30 text-white placeholder:text-gray-500 h-12"
            />
          )}
        </div>
      )}

      {profileData?.is_pro && (
        <ProControls 
          tone={tone} 
          setTone={setTone} 
          threadSize={threadSize} 
          setThreadSize={setThreadSize}
          contentType={selectedContentType}
        />
      )}

      <Button
        onClick={handleSubmit}
        disabled={!input || isGenerating || !isValidInput()}
        className="w-full bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 transition-opacity h-12 text-white font-medium"
      >
        {isGenerating ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </div>
        ) : (
          `Generate ${selectedContentType === 'thread' ? 'Thread' : selectedContentType === 'reddit' ? 'Reddit Post' : 'Long Tweet'}`
        )}
      </Button>
    </div>
  );
};