import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RateLimitConfig {
  hourlyLimit: number;
  dailyLimit: number;
}

const defaultConfig: RateLimitConfig = {
  hourlyLimit: 10,    // 10 requests per hour
  dailyLimit: 100,    // 100 requests per day
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Rate limiter function called');
    
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
      console.error('User not authenticated');
      throw new Error('Not authenticated')
    }

    const config: RateLimitConfig = defaultConfig;
    const now = new Date();
    
    // Check hourly limit
    const hourAgo = new Date(now.getTime() - (60 * 60 * 1000));
    const { count: hourlyCount } = await supabaseClient
      .rpc('get_request_count', {
        user_id: user.id,
        window_start: hourAgo.toISOString()
      });

    console.log('Hourly count:', hourlyCount);
    
    if (hourlyCount >= config.hourlyLimit) {
      console.error('Hourly rate limit exceeded');
      throw new Error(`Rate limit exceeded: Maximum ${config.hourlyLimit} threads per hour`);
    }

    // Check daily limit
    const dayAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
    const { count: dailyCount } = await supabaseClient
      .rpc('get_request_count', {
        user_id: user.id,
        window_start: dayAgo.toISOString()
      });

    console.log('Daily count:', dailyCount);
    
    if (dailyCount >= config.dailyLimit) {
      console.error('Daily rate limit exceeded');
      throw new Error(`Rate limit exceeded: Maximum ${config.dailyLimit} threads per day`);
    }

    // Log the request
    await supabaseClient
      .from('request_logs')
      .insert([
        {
          user_id: user.id,
          timestamp: now.toISOString()
        }
      ]);

    return new Response(
      JSON.stringify({ 
        success: true,
        hourlyCount,
        dailyCount,
        hourlyLimit: config.hourlyLimit,
        dailyLimit: config.dailyLimit
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in rate-limiter:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.message.includes('Rate limit exceeded') ? 429 : 400,
      }
    )
  }
})