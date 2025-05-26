import React from 'react';

function FlightPromoBanners() {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Flight Promo Banner 1 */}
          <div
            className="relative bg-cover bg-center rounded-lg overflow-hidden h-64 md:h-80"
            style={{
              backgroundImage: 'url(\'https://images.unsplash.com/photo-1527613426441-4da17471b660?auto=format&fit=crop&w=1920&q=80\')', // Placeholder flight image
            }}
          >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10 flex flex-col items-start justify-end h-full p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Find Your Next Adventure</h3>
              <p className="text-white text-sm mb-4">Search and book flights to amazing destinations worldwide.</p>
              <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition-colors">
                Search Flights
              </button>
            </div>
          </div>

          {/* Flight Promo Banner 2 */}
          <div
            className="relative bg-cover bg-center rounded-lg overflow-hidden h-64 md:h-80"
            style={{
              backgroundImage: 'url(\'https://images.unsplash.com/photo-1465447142348-e823086c7910?auto=format&fit=crop&w=1920&q=80\')', // Another placeholder flight image
            }}
          >
             <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10 flex flex-col items-start justify-end h-full p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Explore Premium Travel</h3>
              <p className="text-white text-sm mb-4">Experience comfort and luxury with Business and First Class tickets.</p>
              <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FlightPromoBanners; 