import React from "react";
import { Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-[#1A1F2C]">Thread Genius</h1>
        <p className="text-sm text-gray-500">Transform your videos into engaging threads</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#8B5CF6]">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#8B5CF6]">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};