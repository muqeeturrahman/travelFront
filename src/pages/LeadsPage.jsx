import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Mail, Shield, Clock, Star, CheckCircle, ArrowRight, Phone, MapPin, Globe } from 'lucide-react';
import HomeDeals from '../components/home/HomeDeals';
import FlightPromos from '../components/home/FlightPromos';

function LeadsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({ name: '', email: '', phone: '', interests: [] });
    }, 3000);
  };

  const LeadForm = ({ className = "", title = "Get Exclusive Travel Deals!", subtitle = "Save up to 40% on flights and hotels" }) => (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email address"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Travel Interests (Optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Flights', 'Hotels', 'Vacation Packages', 'Car Rentals', 'Cruises', 'Travel Insurance'].map((interest) => (
              <label key={interest} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{interest}</span>
              </label>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </div>
          ) : submitSuccess ? (
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Success! Check your email
            </div>
          ) : (
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Get My Exclusive Deals
            </div>
          )}
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          By subscribing, you agree to receive marketing emails from Flight On Budget. 
          You can unsubscribe at any time.
        </p>
      </form>
    </div>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get Exclusive Travel Deals to Your Inbox!
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Save up to 40% on flights and hotels. Join thousands of travelers who get the best deals first.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="text-left">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-lg">Early access to flash sales</span>
                </div>
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-lg">Personalized travel recommendations</span>
                </div>
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-lg">Exclusive member-only discounts</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-lg">Free travel tips and guides</span>
                </div>
              </div>
              
              <LeadForm 
                title="Start Saving Today!"
                subtitle="Join our exclusive travel community"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Travelers Worldwide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Flight On Budget for their booking needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">$2M+</div>
              <div className="text-gray-600">Saved by Our Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4.8/5</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-gray-400 font-semibold">Trusted Partners:</div>
            <div className="flex items-center gap-6">
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm font-semibold">Airlines</div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm font-semibold">Hotels</div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm font-semibold">Car Rental</div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm font-semibold">Insurance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join Our Travel Community?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get access to exclusive benefits that regular travelers don't have
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Early Access</h3>
              <p className="text-gray-600">
                Be the first to know about flash sales and limited-time offers before they're gone.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Deals</h3>
              <p className="text-gray-600">
                Receive offers tailored to your travel preferences and favorite destinations.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Price Protection</h3>
              <p className="text-gray-600">
                We'll notify you if prices drop on your booked flights or hotels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting exclusive travel deals is as easy as 1-2-3
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Your Info</h3>
              <p className="text-gray-600">
                Enter your name and email to join our exclusive travel community.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Matched</h3>
              <p className="text-gray-600">
                We'll match you with the best deals based on your travel preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enjoy Deals</h3>
              <p className="text-gray-600">
                Receive exclusive offers and save big on your next adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our exclusive travel deals
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my information safe and secure?
              </h3>
              <p className="text-gray-600">
                Absolutely! We use industry-standard encryption to protect your personal information. 
                We never share your data with third parties without your explicit consent.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I unsubscribe at any time?
              </h3>
              <p className="text-gray-600">
                Yes, you can unsubscribe from our emails at any time by clicking the unsubscribe 
                link at the bottom of any email we send you.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How often will I receive deals?
              </h3>
              <p className="text-gray-600">
                We typically send 2-3 emails per week with the best deals and travel inspiration. 
                You can adjust your email preferences anytime.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are these deals really exclusive?
              </h3>
              <p className="text-gray-600">
                Yes! Many of our deals are subscriber-only and not available to the general public. 
                We negotiate special rates with our travel partners just for our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Deals Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🛫 Amazing Flight Deals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book your next adventure with our exclusive flight offers. Limited time deals with flexible booking options.
            </p>
          </div>
          <FlightPromos />
        </div>
      </section>

      {/* Travel Packages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🎒 Exclusive Travel Packages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Curated travel experiences with the best prices and unique destinations
            </p>
          </div>
          <HomeDeals />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Saving on Your Next Trip?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of travelers who are already saving big on flights and hotels
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="text-left">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-lg">No spam, only the best deals</span>
                </div>
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-lg">Cancel anytime</span>
                </div>
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-lg">Free to join</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-lg">Instant access to deals</span>
                </div>
              </div>
              
              <LeadForm 
                title="Join Now & Save!"
                subtitle="Get your first exclusive deal within 24 hours"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              Questions? Contact our travel experts 24/7
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-400" />
                <span>+61290984324</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-400" />
                <span>Info@flightonbudget.com</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-400" />
                <span>www.flightonbudget.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default LeadsPage; 