import React from "react";
import { Header } from "@/components/Header";

const TermsOfService = () => {
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
          <h1 className="text-3xl font-bold mb-8 text-white font-orbitron">Terms of Service</h1>
          <div className="prose max-w-none text-gray-300 font-rajdhani">
            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h2 className="text-xl font-semibold mb-4 text-cyber-blue font-orbitron">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using ThreadGenius, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </div>

            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h2 className="text-xl font-semibold mb-4 text-cyber-blue font-orbitron">2. Description of Service</h2>
              <p className="mb-4">
                ThreadGenius provides an AI-powered platform for generating and managing social media content threads. The service includes both free and premium features.
              </p>
            </div>

            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h2 className="text-xl font-semibold mb-4 text-cyber-blue font-orbitron">3. User Obligations</h2>
              <p className="mb-4">
                Users must provide accurate information when creating an account and are responsible for maintaining the security of their account credentials.
              </p>
            </div>

            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h2 className="text-xl font-semibold mb-4 text-cyber-blue font-orbitron">4. Intellectual Property</h2>
              <p className="mb-4">
                All content generated through our service remains the intellectual property of the user, while our platform and technology remain the property of ThreadGenius.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;