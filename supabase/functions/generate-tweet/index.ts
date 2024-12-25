import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { corsHeaders } from './cors.ts';
import { getYouTubeTranscript } from './youtube.ts';
import { generateTweet } from './openai.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { youtubeUrl } = await req.json();
    console.log('Processing YouTube URL:', youtubeUrl);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user from auth header
    const authHeader = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(authHeader);
    if (userError || !user) {
      throw new Error('Invalid user');
    }

    // Get video transcript
    console.log('Fetching video transcript...');
    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!youtubeApiKey) {
      throw new Error('YouTube API key not configured');
    }

    const { transcript, title } = await getYouTubeTranscript(youtubeUrl, youtubeApiKey);
    if (!transcript) {
      throw new Error('Failed to get video transcript');
    }

    console.log('Generating tweet with OpenAI...');
    const tweet = await generateTweet(transcript, title);
    if (!tweet) {
      throw new Error('Failed to generate tweet');
    }

    console.log('Tweet generated successfully');

    // Save tweet to database
    const { error: insertError } = await supabaseClient
      .from('tweets')
      .insert({
        youtube_url: youtubeUrl,
        content: tweet,
        user_id: user.id,
        title: title,
      });

    if (insertError) {
      console.error('Error saving tweet:', insertError);
      throw new Error('Failed to save tweet');
    }

    return new Response(
      JSON.stringify({ tweet }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in generate-tweet function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});