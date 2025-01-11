import { LucideIcon } from "lucide-react";

interface SidebarMenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export const SidebarMenuItem = ({ icon: Icon, label, onClick }: SidebarMenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-200 
        hover:bg-gradient-to-r hover:from-cyber-blue/10 hover:to-cyber-purple/10 
        rounded-md text-cyber-gray-300 hover:text-white group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/0 via-cyber-blue/5 to-cyber-purple/5 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon className="h-5 w-5 text-cyber-blue group-hover:text-cyber-purple transition-colors duration-200" />
      <span className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200">
        {label}
      </span>
      <div className="absolute right-0 h-full w-1 bg-gradient-to-b from-cyber-blue to-cyber-purple 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};