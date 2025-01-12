import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { YoutubeTranscript } from "npm:youtube-transcript";
import { extractVideoId } from "../generate-thread/youtube.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting YouTube video processing');
    const { youtubeUrl } = await req.json();
    
    if (!youtubeUrl) {
      throw new Error('YouTube URL is required');
    }

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    console.log('Fetching transcript for video:', videoId);
    
    try {
      const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
      
      if (!transcriptItems || transcriptItems.length === 0) {
        throw new Error('No transcript available');
      }

      // Combine all transcript text
      const transcriptText = transcriptItems
        .map(item => item.text)
        .join(' ');

      console.log('Successfully retrieved transcript');
      
      return new Response(
        JSON.stringify({ 
          success: true,
          transcript: transcriptText
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    } catch (transcriptError) {
      console.error('Error fetching transcript:', transcriptError);
      throw new Error('Failed to fetch video transcript');
    }
  } catch (error) {
    console.error('Error in process-youtube function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred' 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 500
      }
    );
  }
});