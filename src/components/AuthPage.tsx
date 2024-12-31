import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export const AuthPage = () => {
  const { toast } = useToast();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
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

  const handleDeleteAccount = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to delete your account",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) throw error;

      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted",
      });

      // Sign out after successful deletion
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4 sm:px-6">
      <div className="absolute inset-0 bg-cyber-gradient opacity-20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNNTQgMGg2djZoLTZWMHptNiA2aDZ2NmgtNlY2em0tNiA2aDZ2NmgtNnYtNnptNiA2aDZ2NmgtNnYtNnptLTYgNmg2djZoLTZ2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>

      <div className="max-w-md w-full mx-auto">
        <div className="bg-white/80 p-8 rounded-lg backdrop-blur-sm border border-cyber-purple/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Welcome Back</h2>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#8B5CF6',
                    brandAccent: '#33C3F0',
                  },
                },
              },
              className: {
                message: 'text-red-500',
              },
            }}
            theme="light"
            providers={[]}
            localization={{
              variables: {
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Create Password',
                  button_label: 'Create Account',
                  loading_button_label: 'Creating Account...',
                  social_provider_text: 'Sign up with {{provider}}',
                  link_text: "Don't have an account? Sign up",
                },
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Your Password',
                  button_label: 'Sign In',
                  loading_button_label: 'Signing In...',
                  social_provider_text: 'Sign in with {{provider}}',
                  link_text: 'Already have an account? Sign in',
                },
              },
            }}
          />
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};