import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ContentEditorProps {
  content: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ContentEditor = ({ content, onChange, onSave, onCancel }: ContentEditorProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[200px] text-white break-words bg-[#1A1F2C] border-gray-700"
      />
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={onSave}
          className="bg-gray-700 hover:bg-gray-600"
        >
          Save
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onCancel}
          className="border-gray-700 text-white"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};