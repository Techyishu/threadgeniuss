import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentTypeSelectorProps {
  contentType: string;
  setContentType: (value: string) => void;
}

export const ContentTypeSelector = ({
  contentType,
  setContentType,
}: ContentTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Content Type</label>
        <Select value={contentType} onValueChange={setContentType}>
          <SelectTrigger className="bg-[#0A0F1E] border-cyber-blue/30 text-white">
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1F2C] border-cyber-blue/30">
            <SelectItem value="thread">Twitter Thread</SelectItem>
            <SelectItem value="long_tweet">Long Tweet</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};