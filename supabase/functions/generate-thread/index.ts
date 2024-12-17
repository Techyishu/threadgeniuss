import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function getYouTubeTranscript(videoUrl: string, apiKey: string) {
  const videoId = videoUrl.split('v=')[1]
  if (!videoId) throw new Error('Invalid YouTube URL')

  // First, get video details
  const detailsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
  )
  const details = await detailsResponse.json()
  const title = details.items[0]?.snippet?.title

  // Then get captions
  const captionsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`
  )
  const captions = await captionsResponse.json()
  
  return {
    title,
    transcript: captions.items?.[0]?.snippet?.text || 'No transcript available'
  }
}

async function generateThread(transcript: string, title: string) {
  const configuration = new Configuration({
    apiKey: Deno.env.get('OPENAI_API_KEY'),
  })
  const openai = new OpenAIApi(configuration)

  const prompt = `
    Based on the following YouTube video transcript and title, create an engaging Twitter thread.
    Format it as a numbered list where each item represents one tweet.
    Keep each tweet within 280 characters.
    Make it informative and engaging.
    
    Title: ${title}
    Transcript: ${transcript}
  `

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  })

  return completion.data.choices[0]?.message?.content
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { youtubeUrl } = await req.json()
    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY')
    
    if (!youtubeApiKey) {
      throw new Error('YouTube API key not configured')
    }

    // Get video transcript and title
    const { transcript, title } = await getYouTubeTranscript(youtubeUrl, youtubeApiKey)
    
    // Generate thread using OpenAI
    const thread = await generateThread(transcript, title)

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

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
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ thread: data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})