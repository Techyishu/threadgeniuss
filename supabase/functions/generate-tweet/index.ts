import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generateTweet } from "./deepseek.ts";
import { getTranscript } from "./youtube.ts";
import { corsHeaders } from "./cors.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { youtubeUrl } = await req.json();
    
    // Get video transcript and title
    const { transcript, title } = await getTranscript(youtubeUrl);
    
    if (!transcript) {
      throw new Error('Failed to get video transcript');
    }

    // Generate tweet using DeepSeek
    const tweet = await generateTweet(transcript, title);

    return new Response(
      JSON.stringify({ tweet }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-tweet function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});