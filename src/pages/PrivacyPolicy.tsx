import React from "react";
import { Header } from "@/components/Header";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us, including your name, email address, and usage data to improve our service and your experience.
          </p>

          <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            Your information is used to provide and improve our services, communicate with you, and ensure the security of your account.
          </p>

          <h2 className="text-xl font-semibold mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
          </p>

          <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">
            You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;