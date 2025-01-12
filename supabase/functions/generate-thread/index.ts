import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generateThread } from "./deepseek.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcript, tone, threadSize, contentType, subreddit, postType } = await req.json();
    
    if (!transcript) {
      throw new Error('No transcript provided');
    }

    console.log(`Generating ${contentType} with tone: ${tone} and size: ${threadSize}`);
    
    let systemPrompt = '';
    if (contentType === 'reddit') {
      systemPrompt = `You are a helpful assistant that creates engaging Reddit posts. Create a ${postType} post for r/${subreddit} based on the video transcript. Make it informative and engaging while following the subreddit's typical style.`;
    } else if (contentType === 'long_tweet') {
      systemPrompt = `You are a helpful assistant that creates engaging long-form tweets. Create a detailed tweet that fully explores the topic while staying within Twitter's character limit.`;
    } else {
      systemPrompt = `You are a helpful assistant that creates engaging Twitter threads. Break down the content into digestible tweets that flow naturally.`;
    }

    const thread = await generateThread(transcript, tone, threadSize, systemPrompt);

    return new Response(
      JSON.stringify({ thread }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-thread function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});