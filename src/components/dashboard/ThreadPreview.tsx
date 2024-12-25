import { Copy, Twitter, MessageCircle, Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Thread Preview</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-blue-500 hover:bg-blue-50"
          onClick={() => generatedThread && copyToClipboard(generatedThread)}
        >
          <Copy className="w-4 h-4" />
          Copy All
        </Button>
      </div>
      
      <div className="space-y-4">
        {tweets.length > 0 ? (
          tweets.map((tweet, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">Username</span>
                    <span className="text-gray-500">@username</span>
                  </div>
                  <div className="text-gray-900 whitespace-pre-line mb-3">
                    {tweet}
                  </div>
                  <div className="flex items-center gap-6 text-gray-500">
                    <button className="flex items-center gap-2 hover:text-blue-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">0</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-pink-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">0</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-500">
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
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
              {index < tweets.length - 1 && (
                <div className="absolute left-7 top-[4.5rem] bottom-0 w-0.5 bg-gray-200" />
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Twitter className="w-12 h-12 mx-auto mb-3 text-blue-500 opacity-50" />
            <p>Generated thread will appear here...</p>
          </div>
        )}
      </div>
    </div>
  );
};