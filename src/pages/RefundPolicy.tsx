import React from "react";
import { Header } from "@/components/Header";

const RefundPolicy = () => {
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
          <h1 className="text-3xl font-bold mb-8 text-white font-orbitron">Refund Policy</h1>
          <div className="prose max-w-none text-gray-300 font-rajdhani">
            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h2 className="text-xl font-semibold mb-4 text-cyber-blue font-orbitron">30-Day Money-Back Guarantee</h2>
              <p className="mb-4">
                We offer a 30-day money-back guarantee on all premium subscriptions. If you're not satisfied with our service, you can request a full refund within 30 days of your purchase.
              </p>
            </div>

            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h2 className="text-xl font-semibold mb-4 text-cyber-blue font-orbitron">How to Request a Refund</h2>
              <p className="mb-4">
                To request a refund, please contact our support team with your account details and reason for the refund. We aim to process all refund requests within 5-7 business days.
              </p>
            </div>

            <div className="mb-6 bg-cyber-darker/50 p-6 rounded-lg border border-cyber-blue/20">
              <h2 className="text-xl font-semibold mb-4 text-cyber-blue font-orbitron">Eligibility</h2>
              <p className="mb-4">
                Refunds are available for premium subscriptions only. Free tier usage is not eligible for refunds. Refunds may be denied in cases of apparent abuse or excessive usage of the service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;