import React from 'react';
import { Phone, Mail, MapPin, Plane, Car, Map, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/home/Footer';

function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">Get in touch with our travel experts</p>
        </div>
      </div>

      {/* Company Info & Contact Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Company Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">About </h2>
              <p className="text-gray-600 mb-4">
                Palki travel is your premier travel partner, offering comprehensive travel solutions 
                for both leisure and business travelers. With years of experience in the industry, 
                we pride ourselves on delivering exceptional service and unforgettable travel experiences.
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Services</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Plane className="text-blue-600 w-5 h-5" />
                  <span>Flight Bookings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Map className="text-blue-600 w-5 h-5" />
                  <span>Tour Packages</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Car className="text-blue-600 w-5 h-5" />
                  <span>Car Rentals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="text-blue-600 w-5 h-5" />
                  <span>Custom Packages</span>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-blue-600 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Address</h4>
                  <p className="text-gray-600">
                    Sydney, Australia<br />
                    {/* Business District<br />
                    New York, NY 10001 */}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="text-blue-600 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-gray-600">
                    Main: +61290984324<br />
                    {/* Toll Free: 1-800-Flight On Budget */}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="text-blue-600 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-600">
                    Email: support@palkitravel.com<br />
                    Phone: +61290984324<br />
                    Whatsapp: +61480810519
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactPage; 