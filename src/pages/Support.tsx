import React from "react";
import { Header } from "@/components/Header";

const Support = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Support Center</h1>
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">How do I get started?</h3>
            <p className="mb-4">
              Simply sign up for an account and you'll have immediate access to our thread generation features. Our intuitive interface will guide you through the process.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">What's included in the free plan?</h3>
            <p className="mb-4">
              Free users get access to basic thread generation features with a limited number of generations per month.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Contact Information</h3>
            <p className="mb-4">
              For additional support, please email us at support@threadgenius.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;