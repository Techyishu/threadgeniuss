import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase_supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

async function getYouTubeTranscript(videoUrl: string, apiKey: string) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  console.log('Extracted video ID:', videoId);

  try {
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
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw new Error(`Failed to fetch YouTube data: ${error.message}`);
  }
}

async function generateThread(transcript: string, title: string) {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `
    Based on the following YouTube video transcript and title, create an engaging Twitter thread.
    Format it as a numbered list where each item represents one tweet.
    Keep each tweet within 280 characters.
    Make it informative and engaging.
    
    Title: ${title}
    Transcript: ${transcript}
  `;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content;
  } catch (error) {
    console.error('Error generating thread with OpenAI:', error);
    throw new Error(`Failed to generate thread: ${error.message}`);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get the JWT token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }

    // Create Supabase client with auth context
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Parse request body
    const { youtubeUrl } = await req.json();
    console.log('Received YouTube URL:', youtubeUrl);

    if (!youtubeUrl) {
      return new Response(
        JSON.stringify({ error: 'YouTube URL is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!youtubeApiKey) {
      return new Response(
        JSON.stringify({ error: 'YouTube API key not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get video transcript and title
    const { transcript, title } = await getYouTubeTranscript(youtubeUrl, youtubeApiKey);
    console.log('Successfully retrieved transcript for video:', title);
    
    // Generate thread using OpenAI
    const thread = await generateThread(transcript, title);
    console.log('Successfully generated thread');

    // Save thread to database with user_id
    const { data, error } = await supabaseClient
      .from('threads')
      .insert([
        {
          youtube_url: youtubeUrl,
          content: thread,
          title,
          status: 'completed',
          user_id: user.id  // Set the user_id to the authenticated user's ID
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving thread to database:', error);
      throw error;
    }

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
        status: error.status || 400,
      },
    );
  }
});