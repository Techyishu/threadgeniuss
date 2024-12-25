import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.3.0";
import { getVideoTranscript } from "../generate-thread/youtube.ts";

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
    const transcript = await getVideoTranscript(youtubeUrl);
    if (!transcript) {
      throw new Error('Failed to get video transcript');
    }

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);

    console.log('Generating tweet with OpenAI...');
    // Generate tweet using OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates engaging tweets based on video content. Keep tweets within 280 characters and make them engaging and informative."
        },
        {
          role: "user",
          content: `Create a tweet based on this video transcript: ${transcript}`
        }
      ],
    });

    const tweet = completion.data.choices[0]?.message?.content;
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