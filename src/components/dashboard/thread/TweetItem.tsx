import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface TweetItemProps {
  tweet: string;
  onEdit: () => void;
  onCopy: () => void;
}

export const TweetItem = ({ tweet, onEdit, onCopy }: TweetItemProps) => {
  return (
    <div className="relative bg-[#1A1F2C] rounded-lg border border-gray-800 p-4 group">
      <div className="text-white whitespace-pre-line break-words max-w-full">
        {tweet}
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="text-gray-400 hover:text-white hover:bg-gray-700"
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};