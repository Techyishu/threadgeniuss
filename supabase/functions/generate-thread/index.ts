import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generateThread } from "./deepseek.ts";
import { getTranscript } from "./youtube.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received request to generate thread');
    
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    const { youtubeUrl, tone, threadSize } = await req.json();
    console.log('Request parameters:', { youtubeUrl, tone, threadSize });
    
    if (!youtubeUrl) {
      throw new Error('YouTube URL is required');
    }

    // Get video transcript and title
    console.log('Fetching transcript for:', youtubeUrl);
    const { transcript, title } = await getTranscript(youtubeUrl);
    
    if (!transcript) {
      throw new Error('Failed to get video transcript');
    }
    console.log('Successfully got transcript, title:', title);

    // Generate thread using DeepSeek
    console.log('Generating thread with DeepSeek');
    const thread = await generateThread(transcript, title, tone, threadSize);
    console.log('Thread generated successfully');

    return new Response(
      JSON.stringify({ 
        thread: { 
          content: thread, 
          title 
        }
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in generate-thread function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred' 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: error.message === 'Rate limit exceeded' ? 429 : 500
      }
    );
  }
});