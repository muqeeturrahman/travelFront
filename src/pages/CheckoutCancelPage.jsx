import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutCancelPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
      <svg className="mx-auto mb-4" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="red" strokeWidth="2" fill="none"/><path stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6"/></svg>
      <h1 className="text-2xl font-bold text-red-700 mb-2">Payment Cancelled</h1>
      <p className="text-gray-700 mb-6">Your payment was not completed. You can try again or return to the homepage.</p>
      <Link to="/" className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Back to Home</Link>
    </div>
  </div>
);

export default CheckoutCancelPage; 