import React from "react";
import { Header } from "@/components/Header";

const Support = () => {
  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header />
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(51, 195, 240, 0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="container relative z-10 mx-auto px-4 pt-24 pb-12">
          <h1 className="text-3xl font-bold mb-8 text-white font-orbitron">Support Center</h1>
          <div className="prose max-w-none text-gray-300 font-rajdhani">
            <h2 className="text-xl font-semibold mb-4 text-cyber-blue font-orbitron">Frequently Asked Questions</h2>
            
            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h3 className="text-lg font-medium mb-2 text-white">How do I get started?</h3>
              <p className="mb-4 text-gray-300">
                Simply sign up for an account and you'll have immediate access to our thread generation features. Our intuitive interface will guide you through the process.
              </p>
            </div>

            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h3 className="text-lg font-medium mb-2 text-white">What's included in the free plan?</h3>
              <p className="mb-4 text-gray-300">
                Free users get access to basic thread generation features with a limited number of generations per month.
              </p>
            </div>

            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h3 className="text-lg font-medium mb-2 text-white">Contact Information</h3>
              <p className="mb-4 text-gray-300">
                For additional support, please email us at support@threadgenius.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;