import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ThreadPreviewProps {
  generatedThread: string | null;
  contentType?: string;
}

export const ThreadPreview = ({ generatedThread, contentType = 'thread' }: ThreadPreviewProps) => {
  const { toast } = useToast();
  const [tweets, setTweets] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedTweet, setEditedTweet] = useState<string>("");

  useEffect(() => {
    if (generatedThread) {
      if (contentType === 'thread') {
        setTweets(splitIntoTweets(generatedThread));
      } else {
        setTweets([generatedThread]);
      }
      setEditingIndex(null);
    }
  }, [generatedThread, contentType]);

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
      description: "Content updated successfully",
    });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedTweet("");
  };

  return (
    <div className="bg-[#222222] p-4 sm:p-6 rounded-lg border border-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Preview</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 sm:flex-none border-gray-700 hover:border-gray-600 text-gray-300"
          onClick={() => tweets.length > 0 && copyToClipboard(contentType === 'thread' ? tweets.join('\n\n') : tweets[0])}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy All
        </Button>
      </div>
      
      <div className="space-y-4 w-full">
        {tweets.length > 0 ? (
          contentType === 'thread' ? (
            tweets.map((tweet, index) => (
              <div 
                key={index}
                className="relative bg-[#1A1F2C] rounded-lg border border-gray-800 p-4 group"
              >
                {editingIndex === index ? (
                  <div className="space-y-4">
                    <Textarea
                      value={editedTweet}
                      onChange={(e) => setEditedTweet(e.target.value)}
                      className="w-full min-h-[100px] text-white break-words bg-[#1A1F2C] border-gray-700"
                    />
                    <div className="flex gap-2">
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
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
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
            <div className="relative bg-[#1A1F2C] rounded-lg border border-gray-800 p-4 group">
              {editingIndex === 0 ? (
                <div className="space-y-4">
                  <Textarea
                    value={editedTweet}
                    onChange={(e) => setEditedTweet(e.target.value)}
                    className="w-full min-h-[200px] text-white break-words bg-[#1A1F2C] border-gray-700"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveEdit(0)}
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
                    {tweets[0]}
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick(0, tweets[0])}
                      className="text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(tweets[0])}
                      className="text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          )
        ) : (
          <p className="text-gray-400 text-center text-sm sm:text-base">
            Generated content will appear here...
          </p>
        )}
      </div>
    </div>
  );
};