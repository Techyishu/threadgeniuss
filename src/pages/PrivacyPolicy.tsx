import React from "react";
import { Header } from "@/components/Header";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-white">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Information We Collect</h2>
            <p className="text-slate-300 mb-4">
              We collect the following types of information to provide and improve our services:
            </p>
            <ul className="list-disc pl-6 text-slate-300 mb-4">
              <li>Account information (email, name, profile details)</li>
              <li>Usage data (thread generations, interactions with our platform)</li>
              <li>Payment information for Pro subscriptions</li>
              <li>YouTube URLs and generated content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">2. How We Use Your Information</h2>
            <p className="text-slate-300 mb-4">
              Your information helps us provide and improve our services in the following ways:
            </p>
            <ul className="list-disc pl-6 text-slate-300 mb-4">
              <li>Generating and managing your content threads</li>
              <li>Processing your transactions and subscriptions</li>
              <li>Sending important service updates and notifications</li>
              <li>Improving our AI algorithms and service quality</li>
              <li>Providing customer support and addressing issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Data Security</h2>
            <p className="text-slate-300 mb-4">
              We implement robust security measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 text-slate-300 mb-4">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security audits and updates</li>
              <li>Secure authentication mechanisms</li>
              <li>Limited employee access to user data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Your Rights</h2>
            <p className="text-slate-300 mb-4">
              As a user, you have the following rights regarding your data:
            </p>
            <ul className="list-disc pl-6 text-slate-300 mb-4">
              <li>Access your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Delete your account and associated data</li>
              <li>Export your generated content</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Third-Party Services</h2>
            <p className="text-slate-300 mb-4">
              We integrate with the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-slate-300 mb-4">
              <li>YouTube API for video processing</li>
              <li>Payment processors for handling transactions</li>
              <li>Analytics tools to improve our service</li>
            </ul>
            <p className="text-slate-300 mt-4">
              Each third-party service has its own privacy policy and data handling practices. We recommend reviewing their policies as well.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;