import { Home, List, User, LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  userName?: string;
  onClose?: () => void;
}

export const DashboardSidebar = ({ userName, onClose }: DashboardSidebarProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <Sidebar className="h-full bg-cyber-dark">
      <div className="flex justify-between items-center p-4 border-b border-cyber-blue/20">
        <h2 className="text-lg font-semibold text-cyber-blue">Menu</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-cyber-blue">
          <X className="h-5 w-5" />
        </Button>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-cyber-blue">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => {
                    navigate('/');
                    onClose?.();
                  }} 
                  tooltip="Home"
                  className="text-white hover:bg-cyber-blue/20 w-full flex items-center gap-2 px-4 py-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={onClose} 
                  tooltip="Saved Threads"
                  className="text-white hover:bg-cyber-blue/20 w-full flex items-center gap-2 px-4 py-2"
                >
                  <List className="w-4 h-4" />
                  <span>Saved Threads</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-cyber-blue">Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={onClose} 
                  tooltip="Profile"
                  className="text-white hover:bg-cyber-blue/20 w-full flex items-center gap-2 px-4 py-2"
                >
                  <User className="w-4 h-4" />
                  <span>{userName || 'Profile'}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => {
                    handleSignOut();
                    onClose?.();
                  }} 
                  tooltip="Sign Out"
                  className="text-white hover:bg-cyber-blue/20 w-full flex items-center gap-2 px-4 py-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};