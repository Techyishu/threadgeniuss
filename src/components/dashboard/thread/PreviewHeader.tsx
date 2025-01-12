import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreviewHeaderProps {
  onCopyAll: () => void;
  hasContent: boolean;
}

export const PreviewHeader = ({ onCopyAll, hasContent }: PreviewHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
      <h2 className="text-lg sm:text-xl font-semibold text-white">Preview</h2>
      <Button
        variant="outline"
        size="sm"
        className="flex-1 sm:flex-none border-gray-700 hover:border-gray-600 text-gray-300"
        onClick={onCopyAll}
        disabled={!hasContent}
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy All
      </Button>
    </div>
  );
};