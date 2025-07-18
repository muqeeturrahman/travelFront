import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const CheckoutSuccessPage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [captured, setCaptured] = useState(false);

  // Helper to get orderID from query params
  const getOrderID = () => {
    const params = new URLSearchParams(location.search);
    // Try orderID, fallback to token
    
    return params.get('orderID') || params.get('token');
  };

  useEffect(() => {
    const captureOrder = async () => {
      const orderID = getOrderID();
      if (orderID) {
        console.log('[CheckoutSuccessPage] Calling capture-order API with orderID:', orderID);
        setLoading(true);
        try {
          const response = await axios.post(
            'https://travey-backend.vercel.app/api/paypal/capture-order',
            { orderID },
            { headers: { 'Content-Type': 'application/json' } }
          );
          const data = response.data;
          // Store value and currency for conversion tracking
          window.__lastCaptureOrderData = {
            value: data.value || 1.0,
            currency: data.currency || 'INR'
          };
          console.log('[CheckoutSuccessPage] API response:', data);
          if (data.status === 'COMPLETED' || data.status === 'success') {
            setCaptured(true);
            setError(null);
          } else {
            setError('Payment capture failed.');
          }
        } catch (err) {
          console.error('[CheckoutSuccessPage] API error:', err);
          setError('Payment capture failed.');
        } finally {
          setLoading(false);
        }
      } else {
        console.warn('[CheckoutSuccessPage] No orderID or token found in URL. API not called.');
      }
    };
    captureOrder();
  }, [location.search]);

  useEffect(() => {
    if (captured) {
      // Try to get value and currency from the last API response if available
      let value = 1.0;
      let currency = 'INR';
      if (window.__lastCaptureOrderData) {
        value = window.__lastCaptureOrderData.value || 1.0;
        currency = window.__lastCaptureOrderData.currency || 'INR';
      }
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17359235623/bfiPCOG39fEaEKfUw9VA',
          'value': value,
          'currency': currency
        });
      }
    }
  }, [captured]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {loading ? (
          <>
            <div className="mb-4 animate-spin mx-auto w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full"></div>
            <h1 className="text-xl font-bold text-green-700 mb-2">Finalizing your payment...</h1>
            <p className="text-gray-700 mb-6">Please wait while we confirm your payment with PayPal.</p>
          </>
        ) : error ? (
          <>
            <svg className="mx-auto mb-4" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="red" strokeWidth="2" fill="none"/><path stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6"/></svg>
            <h1 className="text-2xl font-bold text-red-700 mb-2">Payment Error</h1>
            <p className="text-gray-700 mb-6">{error}</p>
            <Link to="/" className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Back to Home</Link>
          </>
        ) : (
          <>
            <svg className="mx-auto mb-4" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="green" strokeWidth="2" fill="none"/><path stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2l4-4"/></svg>
            <h1 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h1>
            <p className="text-gray-700 mb-6">Thank you for your purchase. Your payment has been processed successfully.</p>
            <Link to="/" className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Back to Home</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccessPage; 