import { Button } from "@/components/ui/button";

interface ContentTypeButtonsProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

export const ContentTypeButtons = ({ selectedType, onSelect }: ContentTypeButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Button
        variant={selectedType === 'thread' ? 'default' : 'outline'}
        onClick={() => onSelect('thread')}
        className="flex-1 min-w-[120px]"
      >
        Twitter Thread
      </Button>
      <Button
        variant={selectedType === 'long_tweet' ? 'default' : 'outline'}
        onClick={() => onSelect('long_tweet')}
        className="flex-1 min-w-[120px]"
      >
        Long Tweet
      </Button>
    </div>
  );
};