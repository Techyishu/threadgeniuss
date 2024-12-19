import React from "react";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thread Genius</h1>
          <h2 className="text-sm text-gray-600">Video to Thread Generator</h2>
        </div>
      </div>
    </div>
  );
};