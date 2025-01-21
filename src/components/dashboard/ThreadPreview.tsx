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
      const tweetArray = generatedThread
        .split(/\d+\/\d+\s*/)
        .filter(tweet => tweet.trim().length > 0)
        .map(tweet => tweet.trim());
      setTweets(tweetArray);
      setEditingIndex(null);
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
    <div className="bg-[#222222] p-4 sm:p-6 rounded-lg border border-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Preview</h2>
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto border-gray-700 hover:border-gray-600 text-gray-300"
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
              className="relative bg-[#1A1F2C] rounded-lg border border-gray-800 p-4 group"
            >
              <div className="text-sm text-gray-400 mb-2">
                Tweet {index + 1}/{tweets.length}
              </div>
              {editingIndex === index ? (
                <div className="space-y-4">
                  <Textarea
                    value={editedTweet}
                    onChange={(e) => setEditedTweet(e.target.value)}
                    className="w-full min-h-[100px] text-white break-words bg-[#1A1F2C] border-gray-700"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveEdit(index)}
                      className="bg-gray-700 hover:bg-gray-600"
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="border-gray-700 text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-white whitespace-pre-line break-words max-w-full">
                    {tweet}
                  </div>
                  <div className="absolute top-2 right-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick(index, tweet)}
                      className="text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(tweet)}
                      className="text-gray-400 hover:text-white hover:bg-gray-700"
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