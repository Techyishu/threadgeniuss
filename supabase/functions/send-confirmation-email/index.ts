import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  token: string;
  type: "signup" | "recovery";
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
    const { email, token, type } = (await req.json()) as EmailRequest;

    let subject = "";
    let html = "";

    if (type === "signup") {
      subject = "Confirm your email address";
      html = `
        <h2>Welcome!</h2>
        <p>Click the link below to confirm your email address:</p>
        <a href="${SUPABASE_URL}/auth/v1/verify?token=${token}&type=signup&redirect_to=${window.location.origin}">
          Confirm Email
        </a>
      `;
    } else if (type === "recovery") {
      subject = "Reset your password";
      html = `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${SUPABASE_URL}/auth/v1/verify?token=${token}&type=recovery&redirect_to=${window.location.origin}">
          Reset Password
        </a>
      `;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Your App <onboarding@resend.dev>",
        to: [email],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send email: ${await res.text()}`);
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);