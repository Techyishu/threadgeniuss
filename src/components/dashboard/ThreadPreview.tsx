import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ThreadPreviewProps {
  generatedThread: string | null;
}

export const ThreadPreview = ({ generatedThread }: ThreadPreviewProps) => {
  const { toast } = useToast();
  const [tweets, setTweets] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedTweet, setEditedTweet] = useState<string>("");

  useEffect(() => {
    if (generatedThread) {
      // Process the thread to maintain proper formatting
      const processedThread = generatedThread.trim();
      if (processedThread) {
        // Split only on double newlines that are followed by a tweet number pattern
        const tweetPattern = /(?=\d+\/\d+)/;
        const rawTweets = processedThread.split(tweetPattern).filter(tweet => tweet.trim());
        setTweets(rawTweets);
        setEditingIndex(null);
      }
    }
  }, [generatedThread]);

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

  const handleEditClick = (index: number, tweet: string) => {
    setEditingIndex(index);
    setEditedTweet(tweet);
  };

  const handleSaveEdit = (index: number) => {
    const newTweets = [...tweets];
    newTweets[index] = editedTweet;
    setTweets(newTweets);
    setEditingIndex(null);
    
    toast({
      title: "Saved!",
      description: "Tweet updated successfully",
    });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedTweet("");
  };

  return (
    <div className="bg-background p-4 sm:p-6 rounded-lg border border-gray-700 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Preview</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 sm:flex-none"
          onClick={() => tweets.length > 0 && copyToClipboard(tweets.join('\n\n'))}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy All
        </Button>
      </div>
      
      <div className="space-y-4 w-full">
        {tweets.length > 0 ? (
          tweets.map((tweet, index) => (
            <div 
              key={index}
              className="relative bg-dark-lighter rounded-lg border border-gray-700 p-4 group"
            >
              {editingIndex === index ? (
                <div className="space-y-4">
                  <Textarea
                    value={editedTweet}
                    onChange={(e) => setEditedTweet(e.target.value)}
                    className="w-full min-h-[100px] text-white break-words bg-dark border-gray-700"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveEdit(index)}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <pre className="text-white whitespace-pre-wrap break-words font-sans">
                    {tweet}
                  </pre>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick(index, tweet)}
                      className="text-gray-300 hover:text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(tweet)}
                      className="text-gray-300 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center text-sm sm:text-base">
            Generated thread will appear here...
          </p>
        )}
      </div>
    </div>
  );
};