import React from "react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Terms of Service</h1>
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            Welcome to Bharat Yatra Travels. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions of use.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Booking & Payments</h2>
          <p>
            All bookings are subject to availability. A deposit or full payment is required to confirm a booking depending on the package. Prices are subject to change without prior notice until the booking is confirmed.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Cancellations & Refunds</h2>
          <p>
            Cancellation policies vary depending on the chosen package and service providers (hotels, airlines). Refunds will be processed according to the specific cancellation policy of your booking.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Travel Documents</h2>
          <p>
            It is the passenger&apos;s responsibility to ensure they have the correct travel documents, visas, and health requirements for their destination.
          </p>
          <p className="pt-8 text-sm text-gray-400">Last updated: April 2026</p>
        </div>
      </div>
    </div>
  );
}
