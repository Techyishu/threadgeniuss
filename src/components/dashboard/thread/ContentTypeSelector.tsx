import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ContentTypeSelectorProps {
  contentType: string;
  setContentType: (value: string) => void;
  subreddit: string;
  setSubreddit: (value: string) => void;
  postType: string;
  setPostType: (value: string) => void;
}

export const ContentTypeSelector = ({
  contentType,
  setContentType,
  subreddit,
  setSubreddit,
  postType,
  setPostType,
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
            <SelectItem value="reddit">Reddit Post</SelectItem>
            <SelectItem value="long_tweet">Long Tweet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {contentType === 'reddit' && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Subreddit</label>
            <Input
              type="text"
              placeholder="Enter subreddit name (without r/)"
              value={subreddit}
              onChange={(e) => setSubreddit(e.target.value)}
              className="bg-[#0A0F1E] border-cyber-blue/30 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Post Type</label>
            <Select value={postType} onValueChange={setPostType}>
              <SelectTrigger className="bg-[#0A0F1E] border-cyber-blue/30 text-white">
                <SelectValue placeholder="Select post type" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-cyber-blue/30">
                <SelectItem value="text">Text Post</SelectItem>
                <SelectItem value="link">Link Post</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
};