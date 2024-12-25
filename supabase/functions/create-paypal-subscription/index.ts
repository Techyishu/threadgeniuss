import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function getPayPalAccessToken() {
  const clientId = Deno.env.get('PAYPAL_CLIENT_ID')
  const clientSecret = Deno.env.get('PAYPAL_SECRET_KEY')
  
  const response = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-Language': 'en_US',
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: 'grant_type=client_credentials',
  })

  const data = await response.json()
  return data.access_token
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      req.headers.get('Authorization')?.split(' ')[1] ?? ''
    )

    if (authError || !user) {
      throw new Error('Unauthorized')
    }

    // Check if this is a test subscription request
    const { test } = await req.json()
    
    if (test) {
      // Update the user's profile directly for testing
      const { error: updateError } = await supabaseClient
        .from('profiles')
        .update({ 
          is_pro: true,
          subscription_status: 'active',
          subscription_id: 'test_subscription'
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Regular subscription flow
    const accessToken = await getPayPalAccessToken()
    
    const subscriptionResponse = await fetch('https://api-m.paypal.com/v1/billing/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        plan_id: 'P-9K972479M6302650RM5VX4OQ',
        subscriber: {
          name: {
            given_name: user.email?.split('@')[0] || 'User',
            surname: '',
          },
          email_address: user.email,
        },
        application_context: {
          return_url: `${req.headers.get('origin')}/dashboard?success=true`,
          cancel_url: `${req.headers.get('origin')}/dashboard?success=false`,
        },
      }),
    })

    const subscriptionData = await subscriptionResponse.json()

    if (!subscriptionResponse.ok) {
      console.error('PayPal API Error:', subscriptionData)
      throw new Error(subscriptionData.message || 'Failed to create subscription')
    }

    return new Response(
      JSON.stringify({
        subscriptionId: subscriptionData.id,
        approvalUrl: subscriptionData.links.find((link: any) => link.rel === 'approve').href,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})