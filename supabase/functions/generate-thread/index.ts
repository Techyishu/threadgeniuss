import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generateThread } from "./deepseek.ts";
import { getYouTubeTranscript } from "./youtube.ts";

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
    console.log('Received request to generate thread');
    
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    const { youtubeUrl, transcript, tone, threadSize } = await req.json();
    console.log('Request parameters:', { youtubeUrl, tone, threadSize });
    
    if (!youtubeUrl) {
      throw new Error('YouTube URL is required');
    }

    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!youtubeApiKey) {
      throw new Error('YouTube API key not configured');
    }

    let videoTitle;
    let videoTranscript;

    if (transcript) {
      // Use provided transcript if available
      videoTranscript = transcript;
      // Get only the title from YouTube API
      const { title } = await getYouTubeTranscript(youtubeUrl, youtubeApiKey);
      videoTitle = title;
    } else {
      // Fallback to getting both title and transcript from YouTube
      const { transcript: fetchedTranscript, title } = await getYouTubeTranscript(youtubeUrl, youtubeApiKey);
      videoTranscript = fetchedTranscript;
      videoTitle = title;
    }
    
    if (!videoTranscript) {
      console.error('No transcript found for video');
      throw new Error('Failed to get video transcript');
    }
    console.log('Successfully got transcript, title:', videoTitle);

    // Generate thread using DeepSeek
    console.log('Generating thread with DeepSeek');
    const thread = await generateThread(videoTranscript, videoTitle, tone, threadSize);
    
    if (!thread) {
      console.error('No thread generated from DeepSeek');
      throw new Error('Failed to generate thread content');
    }
    console.log('Thread generated successfully');

    return new Response(
      JSON.stringify({ 
        thread: { 
          content: thread, 
          title: videoTitle 
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