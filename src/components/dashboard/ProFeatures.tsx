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
        <label className="text-sm text-gray-300">Tone</label>
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger className="bg-cyber-dark/60 border-cyber-purple/30 text-white">
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
        <label className="text-sm text-gray-300">Thread Size</label>
        <Select value={threadSize} onValueChange={setThreadSize}>
          <SelectTrigger className="bg-cyber-dark/60 border-cyber-purple/30 text-white">
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