import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function getPayPalAccessToken() {
  const clientId = Deno.env.get('PAYPAL_CLIENT_ID')
  const clientSecret = Deno.env.get('PAYPAL_SECRET_KEY')
  
  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured')
  }

  console.log('Requesting PayPal access token...')
  const response = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-Language': 'en_US',
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('PayPal token error:', error)
    throw new Error(`Failed to get PayPal access token: ${error}`)
  }

  const data = await response.json()
  console.log('Successfully obtained PayPal access token')
  return data.access_token
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting PayPal subscription creation process...')
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Authenticate user
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.split(' ')[1]
    )

    if (authError || !user) {
      console.error('Auth error:', authError)
      throw new Error('Unauthorized')
    }

    console.log('User authenticated:', user.id)

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken()

    // Create subscription
    console.log('Creating PayPal subscription with plan ID: PROD-72U10680ML002484E')
    const subscriptionResponse = await fetch('https://api-m.paypal.com/v1/billing/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Request-Id': crypto.randomUUID(),
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        plan_id: 'PROD-72U10680ML002484E',
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

    const responseText = await subscriptionResponse.text()
    console.log('PayPal API Response:', responseText)

    if (!subscriptionResponse.ok) {
      console.error('PayPal subscription error. Status:', subscriptionResponse.status)
      console.error('Response:', responseText)
      throw new Error(`PayPal subscription creation failed: ${responseText}`)
    }

    const subscriptionData = JSON.parse(responseText)
    console.log('Subscription created:', subscriptionData.id)

    const approvalLink = subscriptionData.links?.find((link: any) => link.rel === 'approve')
    if (!approvalLink) {
      console.error('No approval URL in response:', subscriptionData)
      throw new Error('No approval URL found in PayPal response')
    }

    return new Response(
      JSON.stringify({
        subscriptionId: subscriptionData.id,
        approvalUrl: approvalLink.href,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in create-paypal-subscription:', error)
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})