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
      const formattedTweets = formatIntoThreadTweets(generatedThread);
      setTweets(formattedTweets);
      setEditingIndex(null);
    }
  }, [generatedThread]);

  const formatIntoThreadTweets = (content: string): string[] => {
    const TWEET_LENGTH = 280;
    const words = content.split(' ');
    const tweets: string[] = [];
    let currentTweet = '';
    let wordIndex = 0;

    while (wordIndex < words.length) {
      const word = words[wordIndex];
      const suffix = tweets.length === 0 ? '' : ` ${tweets.length + 1}/${Math.ceil(content.length / TWEET_LENGTH)}`;
      const potentialTweet = currentTweet + (currentTweet ? ' ' : '') + word + suffix;

      if (potentialTweet.length <= TWEET_LENGTH) {
        currentTweet = potentialTweet;
        wordIndex++;
      } else {
        tweets.push(currentTweet + suffix);
        currentTweet = '';
      }
    }

    if (currentTweet) {
      tweets.push(currentTweet + ` ${tweets.length + 1}/${Math.ceil(content.length / TWEET_LENGTH)}`);
    }

    return tweets;
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
    <div className="bg-[#1A1F2C] p-4 sm:p-6 rounded-lg border border-cyber-blue/20 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Preview</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 sm:flex-none border-cyber-blue/30 hover:border-cyber-blue text-cyber-blue"
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
              className="relative bg-[#0A0F1E] rounded-lg border border-dashed border-cyber-blue/20 p-4 group"
            >
              {editingIndex === index ? (
                <div className="space-y-4">
                  <Textarea
                    value={editedTweet}
                    onChange={(e) => setEditedTweet(e.target.value)}
                    className="w-full min-h-[100px] text-white break-words bg-[#1A1F2C] border-cyber-blue/30"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveEdit(index)}
                      className="bg-cyber-blue hover:bg-cyber-blue/90"
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="border-cyber-blue/30 text-white"
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
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick(index, tweet)}
                      className="text-gray-300 hover:text-white hover:bg-cyber-blue/10"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(tweet)}
                      className="text-gray-300 hover:text-white hover:bg-cyber-blue/10"
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