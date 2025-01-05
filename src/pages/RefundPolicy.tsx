import React from "react";
import { Header } from "@/components/Header";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">30-Day Money-Back Guarantee</h2>
          <p className="mb-4">
            We offer a 30-day money-back guarantee on all premium subscriptions. If you're not satisfied with our service, you can request a full refund within 30 days of your purchase.
          </p>

          <h2 className="text-xl font-semibold mb-4">How to Request a Refund</h2>
          <p className="mb-4">
            To request a refund, please contact our support team with your account details and reason for the refund. We aim to process all refund requests within 5-7 business days.
          </p>

          <h2 className="text-xl font-semibold mb-4">Eligibility</h2>
          <p className="mb-4">
            Refunds are available for premium subscriptions only. Free tier usage is not eligible for refunds. Refunds may be denied in cases of apparent abuse or excessive usage of the service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;