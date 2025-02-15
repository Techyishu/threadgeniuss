
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Brain, Loader2 } from "lucide-react";

type ContentType = 'thread' | 'tweet' | 'bio';

export const ContentGenerator = () => {
  const [headline, setHeadline] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState<ContentType>('thread');
  const { toast } = useToast();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    }
  });

  const handleGenerate = async () => {
    if (!headline.trim()) {
      toast({
        title: "Error",
        description: "Please enter a headline first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { headline, contentType }
      });

      if (error) throw error;

      if (data.content) {
        // Save to database
        const { error: saveError } = await supabase
          .from('generated_content')
          .insert({
            headline,
            content_type: contentType,
            generated_content: data.content,
          });

        if (saveError) throw saveError;

        toast({
          title: "Success!",
          description: `Your ${contentType} has been generated`,
        });
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Content Generator</h2>
        <p className="text-gray-400">
          Enter a headline and we'll generate content for you
        </p>
      </div>

      <Tabs defaultValue="thread" className="w-full" onValueChange={(value) => setContentType(value as ContentType)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="thread">Thread</TabsTrigger>
          <TabsTrigger value="tweet">Tweet</TabsTrigger>
          <TabsTrigger value="bio">Bio</TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-4">
          <Textarea
            placeholder="Enter your headline here..."
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="min-h-[100px] bg-gray-900 text-white border-gray-700"
          />

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              {profile?.is_pro 
                ? "Unlimited generations available" 
                : `${profile?.threads_count || 0} generations remaining`}
            </p>
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !headline.trim()} 
              className="bg-cyber-blue hover:bg-cyber-blue/90"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Generate {contentType}
                </>
              )}
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
