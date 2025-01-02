import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the token from the URL hash
    const url = new URL(req.url)
    const hashParams = new URLSearchParams(url.hash.substring(1));
    const token = hashParams.get('token') || url.searchParams.get('token');
    const type = hashParams.get('type') || 'signup';

    if (!token) {
      throw new Error('No confirmation token provided')
    }

    // Verify the token
    const { error: verifyError } = await supabaseClient.auth.verifyOtp({
      token_hash: token,
      type: 'signup'
    })

    if (verifyError) {
      console.error('Error verifying token:', verifyError);
      // Redirect to auth page with error
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': `/auth?error=${encodeURIComponent(verifyError.message)}`
        }
      })
    }

    // Redirect to the dashboard with success message
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': '/dashboard?confirmed=true'
      }
    })

  } catch (error) {
    console.error('Error confirming email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})