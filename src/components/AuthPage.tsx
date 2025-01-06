import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export const AuthPage = () => {
  const { toast } = useToast();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        toast({
          title: "Signed out",
          description: "You have been signed out successfully",
        });
      } else if (event === "SIGNED_IN") {
        toast({
          title: "Signed in",
          description: "Welcome back!",
        });
      } else if (event === "PASSWORD_RECOVERY") {
        toast({
          title: "Password recovery",
          description: "Check your email for password reset instructions",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F1E] px-4 sm:px-6">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/90 to-blue-900/20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="bg-[#1A1F2C]/80 p-8 rounded-lg backdrop-blur-sm border border-cyber-blue/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Welcome Back</h2>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#8B5CF6',
                    brandAccent: '#33C3F0',
                    brandButtonText: "white",
                    defaultButtonBackground: "#1A1F2C",
                    defaultButtonBackgroundHover: "#403E43",
                    inputBackground: "#1A1F2C",
                    inputBorder: "#403E43",
                    inputBorderHover: "#8B5CF6",
                    inputBorderFocus: "#33C3F0",
                  },
                },
              },
              className: {
                message: 'text-red-400',
                button: 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white',
                input: 'bg-[#1A1F2C] border-cyber-blue/30 text-white',
                label: 'text-gray-300',
              },
            }}
            theme="dark"
            providers={["google"]}
            redirectTo={window.location.origin}
            localization={{
              variables: {
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Create Password',
                  button_label: 'Create Account',
                  loading_button_label: 'Creating Account...',
                  social_provider_text: 'Continue with {{provider}}',
                  link_text: "Don't have an account? Sign up",
                },
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Your Password',
                  button_label: 'Sign In',
                  loading_button_label: 'Signing In...',
                  social_provider_text: 'Continue with {{provider}}',
                  link_text: 'Already have an account? Sign in',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};