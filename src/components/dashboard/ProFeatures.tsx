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
        <label className="text-sm font-medium text-cyber-gray-200">Tone</label>
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger className="bg-cyber-gray-800 border-cyber-purple/30 text-white">
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>
          <SelectContent className="bg-cyber-gray-800 border-cyber-purple/30">
            <SelectItem value="professional" className="text-white hover:bg-cyber-blue/10 focus:bg-cyber-blue/20">
              Professional
            </SelectItem>
            <SelectItem value="casual" className="text-white hover:bg-cyber-blue/10 focus:bg-cyber-blue/20">
              Casual
            </SelectItem>
            <SelectItem value="humorous" className="text-white hover:bg-cyber-blue/10 focus:bg-cyber-blue/20">
              Humorous
            </SelectItem>
            <SelectItem value="educational" className="text-white hover:bg-cyber-blue/10 focus:bg-cyber-blue/20">
              Educational
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-cyber-gray-200">Thread Size</label>
        <Select value={threadSize} onValueChange={setThreadSize}>
          <SelectTrigger className="bg-cyber-gray-800 border-cyber-purple/30 text-white">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent className="bg-cyber-gray-800 border-cyber-purple/30">
            <SelectItem value="short" className="text-white hover:bg-cyber-blue/10 focus:bg-cyber-blue/20">
              Short (5 tweets)
            </SelectItem>
            <SelectItem value="medium" className="text-white hover:bg-cyber-blue/10 focus:bg-cyber-blue/20">
              Medium (10 tweets)
            </SelectItem>
            <SelectItem value="long" className="text-white hover:bg-cyber-blue/10 focus:bg-cyber-blue/20">
              Long (15 tweets)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};