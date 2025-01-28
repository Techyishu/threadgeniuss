import React from "react";
import { Header } from "@/components/Header";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-white">Terms of Service</h1>
        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
            <p className="text-slate-300 mb-4">
              By accessing and using ThreadGenius, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Description of Service</h2>
            <p className="text-slate-300 mb-4">
              ThreadGenius provides an AI-powered platform for generating and managing social media content threads. Our service includes:
            </p>
            <ul className="list-disc pl-6 text-slate-300 mb-4">
              <li>AI-powered thread generation from YouTube videos</li>
              <li>Content customization and editing tools</li>
              <li>Thread management and organization features</li>
              <li>Premium features for Pro users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">3. User Accounts</h2>
            <p className="text-slate-300 mb-4">
              Users must provide accurate and complete information when creating an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-slate-300 mb-4">
              <li>Maintaining the security of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Content Guidelines</h2>
            <p className="text-slate-300 mb-4">
              When using ThreadGenius, you agree not to:
            </p>
            <ul className="list-disc pl-6 text-slate-300 mb-4">
              <li>Generate or publish content that violates any laws or regulations</li>
              <li>Infringe upon intellectual property rights of others</li>
              <li>Use the service for spam or automated content generation without human review</li>
              <li>Share access to your account with unauthorized users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Service Limitations</h2>
            <p className="text-slate-300 mb-4">
              Free accounts are limited to 5 thread generations per month. We reserve the right to:
            </p>
            <ul className="list-disc pl-6 text-slate-300 mb-4">
              <li>Modify or discontinue services with reasonable notice</li>
              <li>Update pricing and feature availability</li>
              <li>Suspend accounts that violate our terms</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;