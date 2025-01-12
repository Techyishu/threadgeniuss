import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarMenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
}

export const SidebarMenuItem = ({ icon: Icon, label, onClick, className }: SidebarMenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-cyber-blue/10 rounded-md text-gray-300 hover:text-white",
        className
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
};