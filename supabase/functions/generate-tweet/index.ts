import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.3.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function getYouTubeTranscript(youtubeUrl: string, apiKey: string) {
  try {
    // Validate URL format
    let videoId;
    try {
      const url = new URL(youtubeUrl);
      if (!url.hostname.includes('youtube.com')) {
        throw new Error('Not a YouTube URL');
      }
      videoId = url.searchParams.get('v');
      if (!videoId) {
        throw new Error('No video ID found in URL');
      }
    } catch (error) {
      console.error('URL parsing error:', error);
      throw new Error('Invalid YouTube URL format');
    }

    console.log('Fetching details for video ID:', videoId);

    // First, get video details to get the title
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );
    const detailsData = await detailsResponse.json();
    
    if (!detailsData.items?.[0]?.snippet) {
      console.error('Video details response:', detailsData);
      throw new Error('Failed to fetch video details');
    }

    const title = detailsData.items[0].snippet.title;
    console.log('Retrieved video title:', title);

    // Then, get captions
    const captionsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`
    );
    const captionsData = await captionsResponse.json();

    if (!captionsData.items?.[0]) {
      console.error('Captions response:', captionsData);
      throw new Error('No captions found for this video');
    }

    // Get the first available caption track
    const captionId = captionsData.items[0].id;
    console.log('Found caption track ID:', captionId);

    // Get the actual transcript
    const transcriptResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/captions/${captionId}?key=${apiKey}`
    );
    
    if (!transcriptResponse.ok) {
      console.error('Transcript response status:', transcriptResponse.status);
      throw new Error('Failed to fetch transcript');
    }

    const transcriptText = await transcriptResponse.text();
    console.log('Successfully retrieved transcript');

    return {
      transcript: transcriptText,
      title: title
    };
  } catch (error) {
    console.error('Error in getYouTubeTranscript:', error);
    throw error;
  }
}

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

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);

    console.log('Generating tweet with OpenAI...');
    // Generate tweet using OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates engaging tweets based on video content. Keep tweets within 280 characters and make them engaging and informative."
        },
        {
          role: "user",
          content: `Create a tweet based on this video titled "${title}". Here's the transcript: ${transcript}`
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