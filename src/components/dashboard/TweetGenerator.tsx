import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TweetGeneratorProps {
  onTweetGenerated: (tweet: string) => void;
}

export const TweetGenerator = ({ onTweetGenerated }: TweetGeneratorProps) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isValidYoutubeUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      const isYoutube = urlObj.hostname === 'youtube.com' || urlObj.hostname === 'www.youtube.com';
      const hasVideoId = urlObj.searchParams.get('v');
      return isYoutube && hasVideoId;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL",
        variant: "destructive",
      });
      return;
    }

    if (!isValidYoutubeUrl(youtubeUrl)) {
      toast({
        title: "Error",
        description: "Please enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=xxxxx)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please sign in to generate tweets');
      }

      const { data, error } = await supabase.functions.invoke("generate-tweet", {
        body: { youtubeUrl },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      if (data?.tweet) {
        onTweetGenerated(data.tweet);
        toast({
          title: "Success",
          description: "Tweet generated successfully!",
        });
      } else {
        throw new Error('No tweet was generated');
      }
    } catch (error) {
      console.error("Error generating tweet:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate tweet. Please try again.",
        variant: "destructive",
      });
      onTweetGenerated(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Generate Tweet</h2>
        <p className="text-sm text-gray-500">
          Enter a YouTube URL to generate a tweet based on the video content.
        </p>
      </div>
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=xxxxx)"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
    </form>
  );
};