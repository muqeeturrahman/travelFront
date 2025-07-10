import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/home/Hero';
import HomeDeals from '../components/home/HomeDeals.jsx';
import FlightPromos from '../components/home/FlightPromos.jsx';
import FeaturedPartners from '../components/home/FeaturedPartners.jsx';
import Testimonials from '../components/home/Testimonials.jsx';

function SupportBanner() {
  return (
    <div className="max-w-xl mx-auto my-12 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-200">
      <div className="text-2xl font-bold text-blue-700 mb-2">Need Help? We're Here 24/7!</div>
      <div className="text-lg text-gray-700 mb-2">Sales & Support</div>
      <a href="tel:+18888548426" className="text-xl font-semibold text-blue-600 hover:text-yellow-500 underline">+1 888 854 8426</a>
    </div>
  );
}

function HomePage() {
  return (
    <Layout>
      <Hero />
      <SupportBanner />
      <div className="mb-8" />
      <HomeDeals />
      <FlightPromos />
      <FeaturedPartners />
      <Testimonials />
    </Layout>
  );
}

export default HomePage;