import React from "react";
import { Header } from "@/components/Header";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using ThreadGenius, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
          </p>

          <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
          <p className="mb-4">
            ThreadGenius provides an AI-powered platform for generating and managing social media content threads. The service includes both free and premium features.
          </p>

          <h2 className="text-xl font-semibold mb-4">3. User Obligations</h2>
          <p className="mb-4">
            Users must provide accurate information when creating an account and are responsible for maintaining the security of their account credentials.
          </p>

          <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
          <p className="mb-4">
            All content generated through our service remains the intellectual property of the user, while our platform and technology remain the property of ThreadGenius.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;