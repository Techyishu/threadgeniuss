
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { headline, contentType } = await req.json()

    // Define system prompts based on content type
    const systemPrompts = {
      thread: "You are an expert at creating engaging Twitter threads. Create a thread based on the given headline. Format it with line breaks between tweets and number each tweet.",
      tweet: "You are an expert at writing viral tweets. Create a single tweet based on the given headline. Keep it under 280 characters.",
      bio: "You are an expert at writing professional bios. Create a compelling bio based on the given headline. Keep it concise and professional."
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompts[contentType as keyof typeof systemPrompts]
          },
          {
            role: 'user',
            content: headline
          }
        ],
      }),
    })

    const data = await response.json()
    const content = data.choices[0].message.content

    return new Response(
      JSON.stringify({ content }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
