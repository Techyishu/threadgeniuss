import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface PreviewHeaderProps {
  onCopyAll: () => void;
  hasContent: boolean;
  title?: string;
}

export const PreviewHeader = ({ onCopyAll, hasContent, title = "Preview" }: PreviewHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {hasContent && (
        <Button
          variant="outline"
          size="sm"
          onClick={onCopyAll}
          className="flex items-center gap-2 bg-[#1A1F2C] text-white border-gray-700 hover:bg-gray-700"
        >
          <Copy className="h-4 w-4" />
          Copy All
        </Button>
      )}
    </div>
  );
};