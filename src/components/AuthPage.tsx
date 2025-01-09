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
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-darker px-4">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-neon-grid bg-[length:50px_50px] opacity-5" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker via-cyber-dark to-transparent" />

      {/* Animated glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-blue/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyber-purple/20 rounded-full blur-[100px] animate-pulse delay-300" />

      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="bg-cyber-darker/80 p-8 rounded-lg backdrop-blur-sm border border-cyber-blue/30 shadow-neon">
          <h2 className="text-3xl font-bold text-white mb-8 text-center animate-neonPulse">Welcome Back</h2>
          <Auth
            supabaseClient={supabase}
            view="sign_in"
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#33C3F0',
                    brandAccent: '#8B5CF6',
                    brandButtonText: "white",
                  },
                },
              },
              className: {
                container: 'flex flex-col gap-4',
                button: 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white hover:opacity-90 transition-opacity shadow-neon',
                anchor: 'hidden',
                divider: 'hidden',
                message: 'hidden',
                label: 'hidden',
                input: 'hidden'
              }
            }}
            theme="dark"
            providers={["google"]}
            redirectTo={window.location.origin}
            showLinks={false}
            onlyThirdPartyProviders={true}
          />
        </div>
      </div>
    </div>
  );
};