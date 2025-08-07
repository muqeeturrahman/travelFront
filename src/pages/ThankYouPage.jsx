import React from 'react';
import Layout from '../components/Layout';
import { 
  CheckCircle, 
  Clock, 
  Mail, 
  Phone, 
  ArrowRight, 
  Home, 
  Plane,
  Star,
  Shield,
  Users
} from 'lucide-react';

function ThankYouPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Booking Confirmed!
              </h1>
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                Thank you for choosing Flight On Budget. Your travel request has been successfully submitted.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>24 Hour Response</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Secure Processing</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  <span>Expert Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Success Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
            <div className="p-8 md:p-12">
              {/* Success Icon */}
              <div className="text-center mb-8">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 animate-bounce">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Request Submitted Successfully!
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We've received your travel booking request and our travel experts are working on your personalized quote. 
                  You'll hear from us within 24 hours with detailed information about your custom travel package.
                </p>
              </div>

              {/* What happens next */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">What happens next?</h3>
                    <p className="text-blue-700">Your journey to the perfect trip starts here</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</div>
                      <h4 className="font-semibold text-gray-900">Expert Review</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Our travel experts will review your requirements and create a personalized quote tailored to your needs.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</div>
                      <h4 className="font-semibold text-gray-900">Detailed Quote</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      You'll receive a detailed email with pricing, itinerary, and booking options within 24 hours.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</div>
                      <h4 className="font-semibold text-gray-900">Finalize Booking</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      We'll be available to answer any questions and help you finalize your perfect travel booking.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Need Immediate Assistance?</h3>
                  <p className="text-gray-600">Our travel experts are available 24/7 to help you plan your perfect trip.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <a 
                    href="tel:+61290984324" 
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-blue-300 hover:transform hover:-translate-y-1"
                  >
                    <div className="flex items-start sm:items-center">
                      <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-lg text-gray-900">Call Us</p>
                        <p className="text-blue-600 font-medium break-all sm:break-normal">+61290984324</p>
                        <p className="text-sm text-gray-500 mt-1">Available 24/7</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:Info@flightonbudget.com" 
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-blue-300 hover:transform hover:-translate-y-1"
                  >
                    <div className="flex items-start sm:items-center">
                      <div className="bg-green-100 rounded-full p-3 mr-4 flex-shrink-0">
                        <Mail className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-lg text-gray-900">Email Support</p>
                        <p className="text-green-600 font-medium break-all sm:break-normal">Info@flightonbudget.com</p>
                        <p className="text-sm text-gray-500 mt-1">Quick response</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="/" 
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Home className="h-5 w-5 mr-2" />
                Return to Home
              </a>
              <a 
                href="/deals" 
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Plane className="h-5 w-5 mr-2" />
                View Travel Deals
              </a>
            </div>
            
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Thank you for choosing Flight On Budget. We're excited to help you create unforgettable travel memories!
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Flight On Budget?</h3>
              <p className="text-gray-600">We're committed to providing you with the best travel experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Best Price Guarantee</h4>
                <p className="text-gray-600 text-sm">
                  We guarantee the best prices for your travel packages with our competitive pricing strategy.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Support</h4>
                <p className="text-gray-600 text-sm">
                  Our travel experts are available 24/7 to provide personalized assistance and guidance.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Secure Booking</h4>
                <p className="text-gray-600 text-sm">
                  Your information is protected with industry-standard security measures and encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ThankYouPage;
