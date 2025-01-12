import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import ytdl from 'npm:ytdl-core';

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

    console.log('Extracting audio from:', youtubeUrl);

    // Get video info and best audio format
    const videoInfo = await ytdl.getInfo(youtubeUrl, {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      }
    });

    // Get best audio format
    const audioFormat = ytdl.chooseFormat(videoInfo.formats, { 
      quality: 'highestaudio',
      filter: 'audioonly' 
    });

    if (!audioFormat) {
      throw new Error('No suitable audio format found');
    }

    console.log('Downloading audio...');
    
    // Download audio
    const audioResponse = await fetch(audioFormat.url);
    const audioBuffer = await audioResponse.arrayBuffer();
    
    // Convert audio to base64
    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

    console.log('Audio downloaded, transcribing...');

    // Use OpenAI's Whisper API for transcription
    const formData = new FormData();
    const audioBlob = new Blob([new Uint8Array(audioBuffer)], { type: 'audio/mp4' });
    formData.append('file', audioBlob, 'audio.mp4');
    formData.append('model', 'whisper-1');

    const transcriptionResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      },
      body: formData,
    });

    if (!transcriptionResponse.ok) {
      throw new Error(`OpenAI API error: ${await transcriptionResponse.text()}`);
    }

    const transcriptionResult = await transcriptionResponse.json();
    console.log('Transcription completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        transcript: transcriptionResult.text,
        title: videoInfo.videoDetails.title
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

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