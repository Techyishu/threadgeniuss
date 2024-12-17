import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

interface ThreadPreviewProps {
  generatedThread: string | null;
}

export const ThreadPreview = ({ generatedThread }: ThreadPreviewProps) => {
  const { toast } = useToast();
  const [tweets, setTweets] = useState<string[]>([]);

  useEffect(() => {
    if (generatedThread) {
      setTweets(splitIntoTweets(generatedThread));
    }
  }, [generatedThread]);

  const splitIntoTweets = (thread: string) => {
    return thread.split('\n\n').filter(tweet => tweet.trim().length > 0);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-cyber-dark/80 p-4 sm:p-6 rounded-lg border border-cyber-purple/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Preview</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 sm:flex-none border-cyber-blue/30 hover:border-cyber-blue text-cyber-blue"
          onClick={() => generatedThread && copyToClipboard(generatedThread)}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy All
        </Button>
      </div>
      
      <div className="space-y-4">
        {tweets.length > 0 ? (
          tweets.map((tweet, index) => (
            <div 
              key={index}
              className="relative bg-cyber-dark/40 rounded-lg border border-dashed border-gray-700 p-4 group"
            >
              <div className="text-white whitespace-pre-line">
                {tweet}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => copyToClipboard(tweet)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center text-sm sm:text-base">
            Generated thread will appear here...
          </p>
        )}
      </div>
    </div>
  );
};