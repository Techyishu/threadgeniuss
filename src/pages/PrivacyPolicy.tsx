import React from "react";
import { Header } from "@/components/Header";

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold mb-8 text-white font-orbitron">Privacy Policy</h1>
          <div className="prose max-w-none text-gray-300 font-rajdhani">
            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h2 className="text-xl font-semibold mb-4 text-cyber-blue font-orbitron">Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us, including your name, email address, and usage data to improve our service and your experience.
              </p>
            </div>

            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h2 className="text-xl font-semibold mb-4 text-cyber-blue font-orbitron">How We Use Your Information</h2>
              <p className="mb-4">
                Your information is used to provide and improve our services, communicate with you, and ensure the security of your account.
              </p>
            </div>

            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h2 className="text-xl font-semibold mb-4 text-cyber-blue font-orbitron">Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
              </p>
            </div>

            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h2 className="text-xl font-semibold mb-4 text-cyber-blue font-orbitron">Your Rights</h2>
              <p className="mb-4">
                You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;