import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generateThread } from "./deepseek.ts";
import { getTranscript } from "./youtube.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { youtubeUrl, tone, threadSize } = await req.json();
    
    // Get video transcript and title
    const { transcript, title } = await getTranscript(youtubeUrl);
    
    if (!transcript) {
      throw new Error('Failed to get video transcript');
    }

    // Generate thread using DeepSeek
    const thread = await generateThread(transcript, title, tone, threadSize);

    return new Response(
      JSON.stringify({ thread: { content: thread, title } }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-thread function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});