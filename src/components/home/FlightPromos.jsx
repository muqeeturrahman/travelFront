import React from 'react';

function FlightPromos() {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Our Flight Deals By Searching Flights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Flight Deal 1 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div 
              className="h-48 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://images.pexels.com/photos/379419/pexels-photo-379419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
              }}
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-blue-600">New York</span>
                <span className="text-sm text-gray-500">to</span>
                <span className="text-sm font-semibold text-blue-600">London</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Transatlantic Special</h3>
              <p className="text-gray-600 mb-4">Enjoy premium service on our newest aircraft with special rates</p>
              <div className="flex justify-between items-center">
                {/* <span className="text-2xl font-bold text-blue-700">$499</span> */}
                {/* <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Book Now
                </button> */}
              </div>
            </div>
          </div>

          {/* Flight Deal 2 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div 
              className="h-48 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
              }}
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-blue-600">Los Angeles</span>
                <span className="text-sm text-gray-500">to</span>
                <span className="text-sm font-semibold text-blue-600">Tokyo</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Pacific Explorer</h3>
              <p className="text-gray-600 mb-4">Direct flights with extra legroom and complimentary meals</p>
              <div className="flex justify-between items-center">
                {/* <span className="text-2xl font-bold text-blue-700">$799</span> */}
                {/* <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Book Now
                </button> */}
              </div>
            </div>
          </div>

          {/* Flight Deal 3 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div 
              className="h-48 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://images.pexels.com/photos/2873686/pexels-photo-2873686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
              }}
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-blue-600">Miami</span>
                <span className="text-sm text-gray-500">to</span>
                <span className="text-sm font-semibold text-blue-600">Cancun</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Weekend Getaway</h3>
              <p className="text-gray-600 mb-4">Quick flights to paradise with special weekend rates</p>
              <div className="flex justify-between items-center">
                {/* <span className="text-2xl font-bold text-blue-700">$299</span> */}
                {/* <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Book Now
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FlightPromos;