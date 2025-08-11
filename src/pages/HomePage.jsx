import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet-async';
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
      <a href="tel:+61290984324" className="text-xl font-semibold text-blue-600 hover:text-yellow-500 underline">+61290984324</a>
    </div>
  );
}

function HomePage() {
  return (
    <Layout>
      <Helmet>
        <title>Cheap Flights & Travel Packages | Flight On Budget (Australia & UAE)</title>
        <meta name="description" content="Book cheap flights and curated travel packages with transparent pricing and 24/7 WhatsApp support. Popular routes from Sydney, Melbourne, Brisbane, Perth, Dubai & Abu Dhabi." />
        <link rel="canonical" href="https://www.flightonbudget.com/" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Flight On Budget" />
        <meta property="og:title" content="Cheap Flights & Travel Packages | Flight On Budget" />
        <meta property="og:description" content="Affordable flights and packages for Australia & UAE travelers. No hidden fees, fast support." />
        <meta property="og:url" content="https://www.flightonbudget.com/" />
        <meta property="og:image" content="https://www.flightonbudget.com/static/og/home-1200x630.jpg" />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Flight On Budget',
          url: 'https://www.flightonbudget.com/',
          logo: 'https://www.flightonbudget.com/static/brand/logo.svg',
          sameAs: [
            'https://www.facebook.com/profile.php?id=61578778865538',
            'https://www.instagram.com/flightonbudget_au/'
          ]
        })}</script>

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: 'https://www.flightonbudget.com/',
          name: 'Flight On Budget',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.flightonbudget.com/search?query={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        })}</script>
      </Helmet>
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