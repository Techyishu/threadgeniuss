import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Thread {
  id: string;
  content: string;
  created_at: string;
  status: string;
  title: string | null;
}

export const SavedThreads = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSavedThreads();
  }, []);

  const fetchSavedThreads = async () => {
    try {
      const { data, error } = await supabase
        .from('threads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setThreads(data || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch saved threads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Thread copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy thread",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-white">Loading saved threads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Saved Threads</h1>
        {threads.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-4">
            {threads.map((thread) => (
              <AccordionItem
                key={thread.id}
                value={thread.id}
                className="bg-cyber-dark/80 border border-cyber-purple/20 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-2 text-white hover:no-underline hover:bg-cyber-purple/10">
                  <div className="flex items-center justify-between w-full">
                    <span>{thread.title || 'Untitled Thread'}</span>
                    <span className="text-sm text-gray-400">
                      {new Date(thread.created_at!).toLocaleDateString()}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="relative">
                  <div className="p-4 text-white whitespace-pre-line">
                    {thread.content}
                    <div className="absolute top-2 right-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(thread.content)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-center text-gray-500">No saved threads yet</p>
        )}
      </div>
    </div>
  );
};