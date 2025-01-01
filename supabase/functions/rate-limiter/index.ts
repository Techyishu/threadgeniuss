import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RateLimitConfig {
  maxRequests: number;  // Maximum number of requests allowed
  windowMs: number;     // Time window in milliseconds
}

const defaultConfig: RateLimitConfig = {
  maxRequests: 50,     // 50 requests
  windowMs: 60000,     // per 1 minute
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the user from the request
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      throw new Error('Not authenticated')
    }

    // Adjust rate limits based on user type
    const config: RateLimitConfig = defaultConfig

    // Check current request count
    const now = Date.now()
    const windowStart = now - config.windowMs

    // Get request count from the last window
    const { count } = await supabaseClient
      .rpc('get_request_count', {
        user_id: user.id,
        window_start: new Date(windowStart).toISOString()
      })

    if (count >= config.maxRequests) {
      throw new Error('Rate limit exceeded')
    }

    // Log the request
    await supabaseClient
      .from('request_logs')
      .insert([
        {
          user_id: user.id,
          timestamp: new Date().toISOString()
        }
      ])

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.message === 'Rate limit exceeded' ? 429 : 400,
      }
    )
  }
})