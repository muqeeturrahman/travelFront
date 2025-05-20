import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchForm from '../components/home/SearchForm';
import FilterSidebar from '../components/search/FilterSidebar';
import FlightCard from '../components/flights/FlightCard';
import Footer from '../components/home/Footer';

function SearchPage() {
  const location = useLocation();
  const { flightOffers, searchParams } = location.state || { flightOffers: [], searchParams: null };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      
      {/* Search Form */}
      <div className="bg-blue-900 py-6">
        <div className="container mx-auto px-4">
          <SearchForm 
            activeTab="flights"
            initialSearchParams={searchParams}
          />
        </div>
      </div>
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4 w-full">
            <FilterSidebar />
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4 w-full">
            {/* Results Summary */}
            {flightOffers?.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {flightOffers.length} flights found
                </h2>
              </div>
            )}

            {/* Flight Cards */}
            <div className="space-y-6">
              {flightOffers?.length > 0 ? (
                flightOffers.map((offer, index) => (
                  <FlightCard 
                    key={index}
                    flightOffer={offer}
                    searchParams={searchParams}
                  />
                ))
              ) : (
                <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">No flight offers found. Try searching for flights above.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default SearchPage;
