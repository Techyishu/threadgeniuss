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
      className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-cyber-blue/20 rounded-md"
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
};