import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/home/Footer';

function FlightsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Flight Search Results</h1>
        
        {/* Flight results will be displayed here */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Loading flight results...</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default FlightsPage;