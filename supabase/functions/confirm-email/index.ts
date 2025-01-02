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

    // Get the confirmation token from the URL
    const url = new URL(req.url)
    const token = url.searchParams.get('confirmation_token')

    if (!token) {
      throw new Error('No confirmation token provided')
    }

    // Verify the token and update the user's email status
    const { error } = await supabaseClient.auth.admin.updateUserById(
      token,
      { email_confirmed: true }
    )

    if (error) throw error

    // Redirect to the app's success page
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': '/?confirmed=true'
      }
    })

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})