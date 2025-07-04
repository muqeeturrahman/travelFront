import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/home/Hero';
import HomeDeals from '../components/home/HomeDeals.jsx';
import FlightPromos from '../components/home/FlightPromos.jsx';
import FeaturedPartners from '../components/home/FeaturedPartners.jsx';
import Testimonials from '../components/home/Testimonials.jsx';

function HomePage() {
  return (
    <Layout>
      <Hero />
      <HomeDeals />
      <FlightPromos />
      <FeaturedPartners />
      <Testimonials />
    </Layout>
  );
}

export default HomePage;