import { Share2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThreadPreviewProps {
  generatedThread: string | null;
}

export const ThreadPreview = ({ generatedThread }: ThreadPreviewProps) => {
  return (
    <div className="bg-cyber-dark/80 p-4 sm:p-6 rounded-lg border border-cyber-purple/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Preview</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none border-cyber-purple/30 hover:border-cyber-purple text-cyber-purple"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none border-cyber-blue/30 hover:border-cyber-blue text-cyber-blue"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
      
      <div className="min-h-[200px] bg-cyber-dark/40 rounded-lg border border-dashed border-gray-700 p-4">
        {generatedThread ? (
          <div className="text-white whitespace-pre-line">
            {generatedThread}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-sm sm:text-base">
            Generated thread will appear here...
          </p>
        )}
      </div>
    </div>
  );
};