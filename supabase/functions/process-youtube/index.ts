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

    // Get video info with updated options
    const videoInfo = await ytdl.getInfo(youtubeUrl, {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }
    });

    // Get best audio format with more specific format filtering
    const formats = videoInfo.formats.filter(format => format.hasAudio && !format.hasVideo);
    const audioFormat = formats.sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))[0];

    if (!audioFormat) {
      console.error('Available formats:', videoInfo.formats);
      throw new Error('No suitable audio format found');
    }

    console.log('Selected audio format:', audioFormat.mimeType, 'bitrate:', audioFormat.audioBitrate);
    console.log('Downloading audio...');
    
    // Download audio
    const audioResponse = await fetch(audioFormat.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!audioResponse.ok) {
      throw new Error(`Failed to download audio: ${audioResponse.status} ${audioResponse.statusText}`);
    }

    const audioBuffer = await audioResponse.arrayBuffer();
    console.log('Audio downloaded successfully, size:', audioBuffer.byteLength);
    
    // Create audio blob with explicit mime type
    const audioBlob = new Blob([new Uint8Array(audioBuffer)], { 
      type: audioFormat.mimeType || 'audio/mp4' 
    });

    console.log('Transcribing audio...');

    // Use OpenAI's Whisper API for transcription
    const formData = new FormData();
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
      const errorText = await transcriptionResponse.text();
      console.error('Transcription API error:', errorText);
      throw new Error(`OpenAI API error: ${errorText}`);
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