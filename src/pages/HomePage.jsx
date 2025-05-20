import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/home/Hero';
import PopularDestinations from '../components/home/PopularDestinations.jsx';
import PromoSections from '../components/home/PromoSections.jsx';
import RecommendedHotels from '../components/home/RecommendedHotels.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import Footer from '../components/home/Footer.jsx';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <PopularDestinations />
      <PromoSections />
      <RecommendedHotels />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default HomePage;