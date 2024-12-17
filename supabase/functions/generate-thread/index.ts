import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function extractVideoId(url: string): string | null {
  // Support various YouTube URL formats
  const patterns = [
    // Standard watch URLs
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})(?:&.*)?$/,
    // Shortened youtu.be URLs
    /^(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
    // Embed URLs
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
    // Mobile app URLs
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

async function getYouTubeTranscript(videoUrl: string, apiKey: string) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  console.log('Extracted video ID:', videoId);

  // First, get video details
  const detailsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
  );
  const details = await detailsResponse.json();
  console.log('Video details response:', details);

  if (!details.items?.[0]) {
    throw new Error('Video not found');
  }

  const title = details.items[0]?.snippet?.title;

  // Then get captions
  const captionsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`
  );
  const captions = await captionsResponse.json();
  console.log('Captions response:', captions);
  
  return {
    title,
    transcript: captions.items?.[0]?.snippet?.text || 'No transcript available'
  };
}

async function generateThread(transcript: string, title: string) {
  const configuration = new Configuration({
    apiKey: Deno.env.get('OPENAI_API_KEY'),
  });
  const openai = new OpenAIApi(configuration);

  const prompt = `
    Based on the following YouTube video transcript and title, create an engaging Twitter thread.
    Format it as a numbered list where each item represents one tweet.
    Keep each tweet within 280 characters.
    Make it informative and engaging.
    
    Title: ${title}
    Transcript: ${transcript}
  `;

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.data.choices[0]?.message?.content;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { youtubeUrl } = await req.json();
    console.log('Received YouTube URL:', youtubeUrl);

    if (!youtubeUrl) {
      throw new Error('YouTube URL is required');
    }

    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!youtubeApiKey) {
      throw new Error('YouTube API key not configured');
    }

    // Get video transcript and title
    const { transcript, title } = await getYouTubeTranscript(youtubeUrl, youtubeApiKey);
    console.log('Successfully retrieved transcript for video:', title);
    
    // Generate thread using OpenAI
    const thread = await generateThread(transcript, title);
    console.log('Successfully generated thread');

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Save thread to database
    const { data, error } = await supabaseClient
      .from('threads')
      .insert([
        {
          youtube_url: youtubeUrl,
          content: thread,
          title,
          status: 'completed'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ thread: data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error in generate-thread function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});