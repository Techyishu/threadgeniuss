import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";

interface TweetPreviewProps {
  generatedTweet: string | null;
}

export const TweetPreview = ({ generatedTweet }: TweetPreviewProps) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    if (!generatedTweet) return;

    try {
      await navigator.clipboard.writeText(generatedTweet);
      toast({
        title: "Copied!",
        description: "Tweet copied to clipboard",
      });
    } catch (error) {
      console.error("Failed to copy:", error);
      toast({
        title: "Error",
        description: "Failed to copy tweet",
        variant: "destructive",
      });
    }
  };

  if (!generatedTweet) {
    return (
      <div className="rounded-lg border border-gray-200 p-6 text-center">
        <p className="text-gray-500">
          Generated tweet will appear here...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Preview</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy
        </Button>
      </div>
      <div className="rounded-lg border border-gray-200 p-6">
        <p className="whitespace-pre-wrap">{generatedTweet}</p>
      </div>
    </div>
  );
};