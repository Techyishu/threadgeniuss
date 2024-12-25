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

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-tweet", {
        body: { youtubeUrl },
      });

      if (error) throw error;

      if (data?.tweet) {
        onTweetGenerated(data.tweet);
        toast({
          title: "Success",
          description: "Tweet generated successfully!",
        });
      }
    } catch (error) {
      console.error("Error generating tweet:", error);
      toast({
        title: "Error",
        description: "Failed to generate tweet. Please try again.",
        variant: "destructive",
      });
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
          placeholder="Enter YouTube URL"
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