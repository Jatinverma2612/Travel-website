import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            At Bharat Yatra Travels, your privacy is of utmost importance to us. This Privacy Policy details how we collect, use, and protect your personal information when you use our website and services.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and payment details when you book a package, subscribe to our newsletter, or contact us.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We use your information to process transactions, send periodic emails regarding your bookings, improve our customer service, and personalize your experience on our platform.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
          <p>
            We implement a variety of security measures including SSL encryption to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
          </p>
          <p className="pt-8 text-sm text-gray-400">Last updated: April 2026</p>
        </div>
      </div>
    </div>
  );
}
