import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Share2, Save } from "lucide-react";

export const Dashboard = () => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-cyber-dark p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Thread Generator
          </h1>
          <p className="text-gray-400">Transform YouTube content into engaging threads</p>
        </div>

        {/* Input Section */}
        <div className="bg-gradient-to-r from-cyber-dark to-cyber-dark/50 p-6 rounded-lg border border-cyber-purple/20 backdrop-blur-sm">
          <div className="space-y-4">
            <Input
              type="url"
              placeholder="Paste YouTube URL here..."
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className="bg-cyber-dark/60 border-cyber-purple/30 text-white placeholder:text-gray-500 h-12"
            />
            <Button
              onClick={handleGenerate}
              disabled={!youtubeLink || isGenerating}
              className="w-full bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 transition-opacity h-12 text-white font-medium"
            >
              Generate Thread
            </Button>
          </div>

          {/* Progress Indicator */}
          {isGenerating && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Generating thread...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="bg-cyber-dark/80 p-6 rounded-lg border border-cyber-purple/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Preview</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-cyber-purple/30 hover:border-cyber-purple text-cyber-purple"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-cyber-blue/30 hover:border-cyber-blue text-cyber-blue"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="min-h-[200px] bg-cyber-dark/40 rounded-lg border border-dashed border-gray-700 p-4">
            <p className="text-gray-500 text-center">
              Generated thread will appear here...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};