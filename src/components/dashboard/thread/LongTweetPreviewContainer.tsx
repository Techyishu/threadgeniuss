import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { PreviewHeader } from "./PreviewHeader";
import { ContentEditor } from "./ContentEditor";

interface LongTweetPreviewContainerProps {
  generatedContent: string | null;
}

export const LongTweetPreviewContainer = ({ generatedContent }: LongTweetPreviewContainerProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<string>("");

  useEffect(() => {
    if (generatedContent) {
      setContent(generatedContent);
      setIsEditing(false);
    }
  }, [generatedContent]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(content);
  };

  const handleSave = () => {
    setContent(editedContent);
    setIsEditing(false);
    
    toast({
      title: "Saved!",
      description: "Content updated successfully",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent("");
  };

  return (
    <div className="bg-[#222222] p-4 sm:p-6 rounded-lg border border-gray-800">
      <PreviewHeader 
        onCopyAll={() => copyToClipboard(content)}
        hasContent={!!content}
        title="Long Tweet Preview"
      />
      
      <div className="w-full">
        {!content ? (
          <p className="text-gray-400 text-center text-sm sm:text-base">
            Generated long tweet will appear here...
          </p>
        ) : (
          <div className="bg-[#1A1F2C] rounded-lg p-6 relative group">
            {isEditing ? (
              <ContentEditor
                content={editedContent}
                onChange={setEditedContent}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <>
                <div className="text-white whitespace-pre-line break-words">
                  {content}
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-white hover:bg-gray-700 px-3 py-1.5 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => copyToClipboard(content)}
                    className="text-gray-400 hover:text-white hover:bg-gray-700 px-3 py-1.5 rounded text-sm"
                  >
                    Copy
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};