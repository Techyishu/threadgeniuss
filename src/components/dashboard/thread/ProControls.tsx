import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProControlsProps } from "@/types/thread";

export const ProControls = ({ 
  tone, 
  setTone, 
  threadSize, 
  setThreadSize 
}: ProControlsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Tone</label>
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger className="bg-[#0A0F1E] border-cyber-blue/30 text-white">
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1F2C] border-cyber-blue/30">
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="humorous">Humorous</SelectItem>
            <SelectItem value="educational">Educational</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Thread Size</label>
        <Select value={threadSize} onValueChange={setThreadSize}>
          <SelectTrigger className="bg-[#0A0F1E] border-cyber-blue/30 text-white">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1F2C] border-cyber-blue/30">
            <SelectItem value="short">Short (5 tweets)</SelectItem>
            <SelectItem value="medium">Medium (10 tweets)</SelectItem>
            <SelectItem value="long">Long (15 tweets)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};