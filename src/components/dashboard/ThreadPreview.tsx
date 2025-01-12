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
      const processedThread = generatedThread.trim();
      if (processedThread) {
        // Updated regex pattern to properly capture tweet numbers
        const tweetPattern = /(\d+\/\d+:?)/;
        const rawTweets = processedThread
          .split(tweetPattern)
          .filter(Boolean)
          .reduce((acc: string[], part, index, array) => {
            if (index % 2 === 0) {
              // If there's a next part (number), combine them
              if (array[index + 1]) {
                acc.push(array[index + 1] + part);
              } else {
                // If it's the last part without a number, add it as is
                acc.push(part);
              }
            }
            return acc;
          }, []);
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
              className="relative bg-dark-lighter rounded-lg border border-gray-700 group min-h-[150px]"
            >
              {editingIndex === index ? (
                <div className="p-6 space-y-4">
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
                  <div className="p-6 text-white whitespace-pre-wrap break-words font-sans">
                    {tweet}
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
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