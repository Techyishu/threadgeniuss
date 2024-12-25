import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface TweetPreviewProps {
  generatedTweet: string | null;
}

export const TweetPreview = ({ generatedTweet }: TweetPreviewProps) => {
  const { toast } = useToast();

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

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-cyber-purple/20 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Preview</h2>
        {generatedTweet && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none border-cyber-blue/30 hover:border-cyber-blue text-cyber-blue"
            onClick={() => copyToClipboard(generatedTweet)}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Tweet
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {generatedTweet ? (
          <div className="relative bg-gray-50 rounded-lg border border-dashed border-gray-300 p-4">
            <div className="text-gray-900 whitespace-pre-line">
              {generatedTweet}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center text-sm sm:text-base">
            Generated tweet will appear here...
          </p>
        )}
      </div>
    </div>
  );
};