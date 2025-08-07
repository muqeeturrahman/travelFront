import React, { useState } from 'react';
import { Lock, Shield, CheckCircle, AlertCircle, CreditCard, Star, Users, Award, Plane, Globe, Zap, DollarSign, ArrowRight, Play } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/home/Footer';

const API_URL = 'https://travey-backend.vercel.app';

const CustomPayPage = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const validateAmount = (val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!validateAmount(amount)) {
      setErrorMsg('Please enter a valid amount greater than 0.');
      return;
    }
    setLoading(true);
    setStatus('processing');
    try {
      const response = await fetch(`${API_URL}/api/paypal/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          value: parseFloat(amount),
          currency_code: 'USD',
          return_url: `${window.location.origin}/checkout-success`,
          cancel_url: `${window.location.origin}/checkout-cancel`
        })
      });
      const data = await response.json();
      console.log('PayPal create-order response:', data);
      if (data.approvalUrl) {
        // Store amount for later use in success page
        sessionStorage.setItem('paymentAmount', amount);
        window.location.href = data.approvalUrl;
      } else {
        setStatus('error');
        setErrorMsg('Failed to create payment order.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Bank-Level Security',
      desc: '256-bit SSL encryption protects every transaction'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Instant Processing',
      desc: 'Lightning-fast payments in under 3 seconds'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Reach',
      desc: 'Accept payments from 200+ countries worldwide'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: '24/7 Expert Support',
      desc: 'Round-the-clock assistance from travel specialists'
    }
  ];

  const benefits = [
    'No hidden fees or surprise charges',
    'Instant booking confirmations',
    'Full refund protection',
    'Multi-currency support',
    'Mobile-optimized experience',
    'One-click repeat bookings'
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Travelers' },
    { number: '150+', label: 'Countries Served' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '<3s', label: 'Processing Time' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-blue-800/30 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Shield className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Trusted by thousands of travelers worldwide</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Secure Travel
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Payments
                </span>
                Made Simple
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-lg">
                Experience the future of travel payments. Fast, secure, and designed for the modern traveler.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => document.getElementById('payment-form').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-8 py-4 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  Start Payment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                {/* <button className="border-2 border-white/20 text-white font-medium px-8 py-4 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button> */}
              </div>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Payment Form Section */}
      <section id="payment-form" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Form */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Secure Payment</h2>
                  <p className="text-gray-600">Enter your payment details below</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Payment Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl font-medium">$</span>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-2xl font-bold transition-all"
                        placeholder="0.00"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                  {/* <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Payment Description</label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Flight booking, hotel reservation, tour package..."
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      disabled={loading}
                    />
                  </div> */}
                  {errorMsg && (
                    <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                      <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">{errorMsg}</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center shadow-lg"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-3 h-6 w-6" />
                        Pay Securely with PayPal
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center space-x-4 pt-4">
                    <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" className="h-8 opacity-60" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 opacity-60" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6 opacity-60" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1202px-American_Express_logo_%282018%29.svg.png?20191022102801" alt="Amex" className="h-6 opacity-60" />
                  </div>

                </div>
                {/* Status Messages */}
                {status === 'success' && (
                  <div className="flex items-center justify-center mt-6 p-4 bg-green-50 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-green-700 font-medium">Payment processed successfully!</span>
                  </div>
                )}
              </div>
            </div>
            {/* Right Column - Benefits */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Why Choose FlightsOnBudget?</h3>
                <div className="grid gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Enterprise-Grade Security</h4>
                <p className="text-gray-700 mb-6">
                  Your payments are protected by the same security standards used by major banks and financial institutions.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white px-4 py-2 rounded-full text-sm font-medium text-blue-700 border border-blue-200">
                    <Shield className="inline h-4 w-4 mr-1" />
                    SSL Encrypted
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full text-sm font-medium text-green-700 border border-green-200">
                    <Lock className="inline h-4 w-4 mr-1" />
                    PCI Compliant
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full text-sm font-medium text-purple-700 border border-purple-200">
                    <Award className="inline h-4 w-4 mr-1" />
                    ISO Certified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for Modern Travel</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with unmatched security to deliver the perfect payment experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-12 text-white text-center">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl font-medium mb-8 italic">
                " Don’t miss out on your next adventure. Pay securely and let us handle the rest — from flights to full travel packages."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                {/* <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-lg">SM</span>
                </div> */}
                {/* <div className="text-left">
                  <div className="font-bold">Sarah Mitchell</div>
                  <div className="text-blue-300">Travel Operations Director, GlobalTours</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CustomPayPage;