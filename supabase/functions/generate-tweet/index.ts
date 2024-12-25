import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { getYouTubeTranscript } from '../generate-thread/youtube.ts'
import { generateTweet } from './openai.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { youtubeUrl, tone = 'professional' } = await req.json();
    console.log('Received request:', { youtubeUrl, tone });

    if (!youtubeUrl) {
      return new Response(
        JSON.stringify({ error: 'YouTube URL is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('is_pro')
      .eq('id', user.id)
      .single();

    if (profileError) {
      throw profileError;
    }

    const isPro = profile?.is_pro ?? false;

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

    const { transcript, title } = await getYouTubeTranscript(youtubeUrl, youtubeApiKey);
    console.log('Successfully retrieved transcript for video:', title);
    
    const tweet = await generateTweet(transcript, title, tone, isPro);
    console.log('Successfully generated tweet');

    const { data, error } = await supabaseClient
      .from('tweets')
      .insert([
        {
          youtube_url: youtubeUrl,
          content: tweet,
          title,
          status: 'completed',
          user_id: user.id
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving tweet to database:', error);
      throw error;
    }

    return new Response(
      JSON.stringify({ tweet: data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error in generate-tweet function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.status || 400,
      },
    );
  }
});