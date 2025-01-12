import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generateThread } from "../generate-thread/deepseek.ts";
import ytdl from 'npm:ytdl-core';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting YouTube processing');
    const { youtubeUrl, tone, threadSize } = await req.json();

    if (!youtubeUrl) {
      throw new Error('YouTube URL is required');
    }

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    // Get video details using YouTube API
    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtubeApiKey}`
    );
    const videoData = await videoResponse.json();
    const videoTitle = videoData.items?.[0]?.snippet?.title;

    if (!videoTitle) {
      throw new Error('Could not fetch video information');
    }

    console.log('Getting video info from YouTube...');
    
    // Configure ytdl with more options and fallbacks
    const formats = [];
    let audioBuffer;
    
    try {
      const info = await ytdl.getInfo(youtubeUrl, {
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        }
      });

      // Get all audio formats and sort by quality
      formats.push(...info.formats
        .filter(format => format.hasAudio && !format.hasVideo)
        .sort((a, b) => Number(b.audioBitrate) - Number(a.audioBitrate))
      );

      // Also include combined formats as fallback
      formats.push(...info.formats
        .filter(format => format.hasAudio)
        .sort((a, b) => Number(b.audioBitrate) - Number(a.audioBitrate))
      );

      console.log(`Found ${formats.length} potential formats`);

      // Try formats one by one until we succeed
      for (const format of formats) {
        try {
          console.log(`Attempting format: ${format.itag} (${format.container})`);
          const response = await fetch(format.url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
          });

          if (response.ok) {
            audioBuffer = await response.arrayBuffer();
            console.log(`Successfully downloaded audio using format ${format.itag}`);
            break;
          }
        } catch (err) {
          console.log(`Failed to download format ${format.itag}:`, err.message);
          continue;
        }
      }

      if (!audioBuffer) {
        throw new Error('Could not download audio from any available format');
      }

    } catch (error) {
      console.error('Error downloading video:', error);
      throw new Error(`Failed to process video: ${error.message}`);
    }

    console.log('Audio downloaded successfully, transcribing...');

    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

    // Transcribe audio using Whisper API
    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    const formData = new FormData();
    formData.append('file', new Blob([audioBuffer], { type: 'audio/mp3' }), 'audio.mp3');
    formData.append('model', 'whisper-1');

    const transcriptionResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
      },
      body: formData,
    });

    if (!transcriptionResponse.ok) {
      throw new Error('Failed to transcribe audio');
    }

    const transcriptionData = await transcriptionResponse.json();
    const transcript = transcriptionData.text;

    console.log('Transcription complete, generating thread...');

    // Generate thread using DeepSeek
    const thread = await generateThread(transcript, videoTitle, tone, threadSize);

    console.log('Thread generation complete');

    return new Response(
      JSON.stringify({
        success: true,
        audio: audioBase64,
        transcript,
        thread: {
          content: thread,
          title: videoTitle,
        },
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in process-youtube function:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'An unexpected error occurred',
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});

function extractVideoId(url: string): string | null {
  const patterns = [
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})(?:&.*)?$/,
    /^(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}