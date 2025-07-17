import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccessPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
      <svg className="mx-auto mb-4" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="green" strokeWidth="2" fill="none"/><path stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2l4-4"/></svg>
      <h1 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h1>
      <p className="text-gray-700 mb-6">Thank you for your purchase. Your payment has been processed successfully.</p>
      <Link to="/" className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Back to Home</Link>
    </div>
  </div>
);

export default CheckoutSuccessPage; 