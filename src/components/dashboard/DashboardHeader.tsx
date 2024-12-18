import React from 'react';

export const DashboardHeader = () => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-cyber-purple to-cyber-blue bg-clip-text text-transparent">
        Video to Thread Generator
      </h2>
      <p className="text-sm text-gray-400">
        Transform any YouTube video into an engaging Twitter thread in seconds
      </p>
    </div>
  );
};