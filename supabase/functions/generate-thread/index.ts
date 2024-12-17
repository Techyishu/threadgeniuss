import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { getYouTubeTranscript } from './youtube.ts'
import { generateThread } from './openai.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
          user_id: user.id
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