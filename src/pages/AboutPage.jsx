import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';

function useCountUp(target, duration = 1500, trigger = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    let end = typeof target === 'number' ? target : parseInt(target.replace(/\D/g, ''));
    let startTime = null;
    function animateCount(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    }
    requestAnimationFrame(animateCount);
    // eslint-disable-next-line
  }, [target, duration, trigger]);
  return count;
}

function AboutPage() {
  // Intersection Observer for stats
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Animated numbers (only animate when statsVisible)
  const years = useCountUp(5, 1500, statsVisible);
  const happy = useCountUp(50000, 1500, statsVisible);
  const tickets = useCountUp(75000, 1500, statsVisible);
  const google = useCountUp(233, 1500, statsVisible);
  const facebook = useCountUp(481, 1500, statsVisible);

  return (
    <Layout>
      {/* Hero Section (now at the very top) */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-600 py-12 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Palki Travel</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium px-4">
            At Palki Travel, we believe travel is not just about destinations — it's about unforgettable experiences, meaningful moments, and seamless journeys.
        </p><br />
        <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium px-4">
            Founded with a passion for exploring the world and making travel accessible to everyone, Palki Travel has quickly grown into a trusted travel partner for thousands across Australia and beyond. Whether you're planning a tropical escape, a romantic getaway, or a group tour, we bring you affordable, all-inclusive packages with no hidden costs — just honest pricing and expert service.
        </p>
      </div>
      {/* About Palki Travel Section (now at the very top)
      <div className="bg-white py-12 px-4 md:px-0 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">About Palki Travel</h1>
          <p className="text-lg text-gray-700 mb-4">
            At Palki Travel, we believe travel is not just about destinations — it's about unforgettable experiences, meaningful moments, and seamless journeys.
          </p>
          <p className="text-gray-700 mb-6">
            Founded with a passion for exploring the world and making travel accessible to everyone, Palki Travel has quickly grown into a trusted travel partner for thousands across Australia and beyond. Whether you're planning a tropical escape, a romantic getaway, or a group tour, we bring you affordable, all-inclusive packages with no hidden costs — just honest pricing and expert service.
          </p>
        </div>
      </div> */}

      {/* What We Offer Section */}
      <div className="bg-gray-50 py-8 px-4 md:px-0 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 text-center">🌍 What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 text-lg">
            <li>International and Domestic Flight Packages</li>
            <li>Flights + Hotel Combos</li>
            <li>Group Tours & Honeymoon Specials</li>
            <li>Custom Travel Planning</li>
            <li>Flexible Dates & Pay-Later Options</li>
            <li>Fast Bookings via WhatsApp or Phone</li>
          </ul>
          <p className="text-gray-700 text-center">
            With operations based in Australia, we proudly serve travelers from Sydney, Melbourne, Brisbane, and Perth, offering tailored packages to destinations like Bali, Japan, New Zealand, Thailand, and Europe.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-8 px-4 md:px-0 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 text-center"> Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 text-lg">
            <li>Transparent pricing with no gimmicks</li>
            <li>Real human support via WhatsApp and phone</li>
            <li>Easy bookings with PAYID, bank transfers & flexible options</li>
            <li>100% commitment to your satisfaction</li>
          </ul>
          <p className="text-gray-700 text-center">
            Whether you're flying solo or planning for the whole family, Palki Travel is here to make your next trip simple, affordable, and memorable.
          </p>
        </div>
      </div>

      {/* Explore Section (Stats) */}
      <div ref={statsRef} className="bg-white py-10 px-4 md:px-0">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-900">Your Gateway to Australia-India Flights</h2>
          <p className="text-gray-700 mb-4">
            Planning a trip from Australia to India? Palki Travel guarantees seamless cross-continental transfers. We link key cities like Sydney, Melbourne, Brisbane, Delhi, and more with our vast network. We’ll look for the best <b>Australia-India flight</b> offers for you, whether you’re travelling to see family or explore new places.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-blue-700">{years}+</span>
              <span className="text-gray-600">Years Experience</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-blue-700">{happy.toLocaleString()}+</span>
              <span className="text-gray-600">Happy Customers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-blue-700">{tickets.toLocaleString()}+</span>
              <span className="text-gray-600">Tickets</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-blue-700">{google}+</span>
              <span className="text-gray-600">Google Reviews</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-blue-700">{facebook}+</span>
              <span className="text-gray-600">Facebook Reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="bg-gray-50 py-10 px-4 md:px-0">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-blue-700 text-2xl font-bold mb-2">100%</span>
            <span className="font-semibold mb-1">Value For Money</span>
            <span className="text-gray-600 text-sm">Best deals and honest pricing</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-blue-700 text-2xl font-bold mb-2">100%</span>
            <span className="font-semibold mb-1">Experienced Guides</span>
            <span className="text-gray-600 text-sm">Travel experts at your service</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-blue-700 text-2xl font-bold mb-2">100%</span>
            <span className="font-semibold mb-1">Always At Your Service</span>
            <span className="text-gray-600 text-sm">24/7 support for all your needs</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-blue-700 text-2xl font-bold mb-2">100%</span>
            <span className="font-semibold mb-1">Personalized & Dedicated WhatsApp Service</span>
            <span className="text-gray-600 text-sm">Direct, personal support</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-blue-700 text-2xl font-bold mb-2">100%</span>
            <span className="font-semibold mb-1">Refer & Earn Bonus</span>
            <span className="text-gray-600 text-sm">Earn for every referral</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-blue-700 text-2xl font-bold mb-2">100%</span>
            <span className="font-semibold mb-1">Flexible Cancellation & Date Change</span>
            <span className="text-gray-600 text-sm">Travel with peace of mind</span>
          </div>
        </div>
      </div>

      {/* Testimonial Section (static sample) */}
      <div className="bg-white py-10 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg shadow p-6">
              <p className="text-gray-700 italic mb-2">“Sudarshana helped me in booking my tickets. She is very professional and helpful in her work. Highly recommended. Thank you Palki Travel.”</p>
              <span className="font-semibold text-blue-700">- Rohit Verma</span>
            </div>
            <div className="bg-gray-50 rounded-lg shadow p-6">
              <p className="text-gray-700 italic mb-2">“Excellent experience with Palki Travel. Highly recommend them. Thank you Sudarshana for helping me in booking my ticket.”</p>
              <span className="font-semibold text-blue-700">- Neeraj Kumar</span>
            </div>
            <div className="bg-gray-50 rounded-lg shadow p-6">
              <p className="text-gray-700 italic mb-2">“Utkarsh patiently helped me find great price for flight from Syd-Hyd with my veer changing needs. Great service and reliable help to find great deals. Thank you Utkarsh for your amazing service.”</p>
              <span className="font-semibold text-blue-700">- Saiprasad Muthyam</span>
            </div>
            <div className="bg-gray-50 rounded-lg shadow p-6">
              <p className="text-gray-700 italic mb-2">“I got a good service and easy to find a good deal.”</p>
              <span className="font-semibold text-blue-700">- Troswald Pereira</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutPage; 