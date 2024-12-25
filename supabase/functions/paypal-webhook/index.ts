import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function verifyWebhookSignature(req: Request, webhookId: string) {
  const clientId = Deno.env.get('PAYPAL_CLIENT_ID')
  const clientSecret = Deno.env.get('PAYPAL_SECRET_KEY')
  
  const auth = btoa(`${clientId}:${clientSecret}`)
  const verifyResponse = await fetch('https://api-m.paypal.com/v1/notifications/verify-webhook-signature', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
    },
    body: JSON.stringify({
      auth_algo: req.headers.get('paypal-auth-algo'),
      cert_url: req.headers.get('paypal-cert-url'),
      transmission_id: req.headers.get('paypal-transmission-id'),
      transmission_sig: req.headers.get('paypal-transmission-sig'),
      transmission_time: req.headers.get('paypal-transmission-time'),
      webhook_id: webhookId,
      webhook_event: await req.json(),
    }),
  })

  return verifyResponse.ok
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const webhookId = Deno.env.get('PAYPAL_WEBHOOK_ID')
    if (!webhookId) {
      throw new Error('PayPal webhook ID not configured')
    }

    // Verify the webhook signature
    const isValid = await verifyWebhookSignature(req, webhookId)
    if (!isValid) {
      throw new Error('Invalid webhook signature')
    }

    const event = await req.json()
    console.log('Received PayPal webhook:', event)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const subscriptionId = event.resource.id
    const eventType = event.event_type

    // Handle different subscription status updates
    switch (eventType) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
      case 'BILLING.SUBSCRIPTION.RENEWED':
        await supabaseClient
          .from('profiles')
          .update({
            is_pro: true,
            subscription_status: 'active',
            subscription_id: subscriptionId
          })
          .eq('subscription_id', subscriptionId)
        break

      case 'BILLING.SUBSCRIPTION.CANCELLED':
      case 'BILLING.SUBSCRIPTION.EXPIRED':
      case 'BILLING.SUBSCRIPTION.SUSPENDED':
        await supabaseClient
          .from('profiles')
          .update({
            is_pro: false,
            subscription_status: eventType.toLowerCase().split('.')[2],
            subscription_id: subscriptionId
          })
          .eq('subscription_id', subscriptionId)
        break

      default:
        console.log('Unhandled event type:', eventType)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})