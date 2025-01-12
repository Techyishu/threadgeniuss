import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generateTweet } from "./deepseek.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, tone } = await req.json();
    
    if (!topic) {
      throw new Error('No topic provided');
    }

    console.log(`Generating tweet for topic: ${topic} with tone: ${tone}`);
    
    const tweet = await generateTweet(topic, tone);

    return new Response(
      JSON.stringify({ tweet }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-tweet function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});