import { Copy, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface ThreadPreviewProps {
  generatedThread: string | null;
}

export const ThreadPreview = ({ generatedThread }: ThreadPreviewProps) => {
  const { toast } = useToast();
  const [tweets, setTweets] = useState<string[]>([]);

  const splitIntoTweets = (thread: string) => {
    // Split thread into tweets based on newlines or character limit
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

  const saveDraft = async () => {
    try {
      if (!generatedThread) {
        toast({
          title: "Error",
          description: "No thread to save",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('threads')
        .insert({
          content: generatedThread,
          status: 'draft',
          youtube_url: '', // This should be passed from the parent component
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Thread saved as draft",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save draft",
        variant: "destructive",
      });
    }
  };

  // Split thread into tweets when generatedThread changes
  useState(() => {
    if (generatedThread) {
      setTweets(splitIntoTweets(generatedThread));
    }
  }, [generatedThread]);

  return (
    <div className="bg-cyber-dark/80 p-4 sm:p-6 rounded-lg border border-cyber-purple/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Preview</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none border-cyber-purple/30 hover:border-cyber-purple text-cyber-purple"
            onClick={saveDraft}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
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