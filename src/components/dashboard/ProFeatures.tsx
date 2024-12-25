import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProFeaturesProps {
  tone: string;
  setTone: (value: string) => void;
  threadSize: string;
  setThreadSize: (value: string) => void;
}

export const ProFeatures = ({ tone, setTone, threadSize, setThreadSize }: ProFeaturesProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1A1F2C]">Tone</label>
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger className="bg-white border-gray-200 text-[#1A1F2C] h-12 focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent">
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="humorous">Humorous</SelectItem>
            <SelectItem value="educational">Educational</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1A1F2C]">Thread Size</label>
        <Select value={threadSize} onValueChange={setThreadSize}>
          <SelectTrigger className="bg-white border-gray-200 text-[#1A1F2C] h-12 focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short (5 tweets)</SelectItem>
            <SelectItem value="medium">Medium (10 tweets)</SelectItem>
            <SelectItem value="long">Long (15 tweets)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};