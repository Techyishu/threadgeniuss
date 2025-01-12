import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { PreviewHeader } from "./PreviewHeader";
import { TweetItem } from "./TweetItem";
import { ContentEditor } from "./ContentEditor";

interface ThreadPreviewContainerProps {
  generatedThread: string | null;
}

export const ThreadPreviewContainer = ({ generatedThread }: ThreadPreviewContainerProps) => {
  const { toast } = useToast();
  const [tweets, setTweets] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedTweet, setEditedTweet] = useState<string>("");

  useEffect(() => {
    if (generatedThread) {
      setTweets(splitIntoTweets(generatedThread));
      setEditingIndex(null);
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

  const handleCopyAll = () => {
    if (tweets.length > 0) {
      copyToClipboard(tweets.join('\n\n'));
    }
  };

  return (
    <div className="bg-[#222222] p-4 sm:p-6 rounded-lg border border-gray-800">
      <PreviewHeader 
        onCopyAll={handleCopyAll}
        hasContent={tweets.length > 0}
        title="Thread Preview"
      />
      
      <div className="space-y-4 w-full">
        {tweets.length === 0 ? (
          <p className="text-gray-400 text-center text-sm sm:text-base">
            Generated thread will appear here...
          </p>
        ) : (
          tweets.map((tweet, index) => (
            editingIndex === index ? (
              <ContentEditor
                key={index}
                content={editedTweet}
                onChange={setEditedTweet}
                onSave={() => handleSaveEdit(index)}
                onCancel={handleCancelEdit}
              />
            ) : (
              <TweetItem
                key={index}
                tweet={tweet}
                onEdit={() => handleEditClick(index, tweet)}
                onCopy={() => copyToClipboard(tweet)}
              />
            )
          ))
        )}
      </div>
    </div>
  );
};