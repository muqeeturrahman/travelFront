import React from 'react';

function PromoSections() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Promo 1: Things To Do */}
          <div className="relative rounded-xl overflow-hidden h-[300px] group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ 
                backgroundImage: `url('https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Things To Do On<br />Your Trip</h3>
              <button className="bg-white text-blue-900 py-2 px-4 rounded-md text-sm font-medium mt-4 hover:bg-gray-100 transition-colors">
                Explore Now
              </button>
            </div>
          </div>

          {/* Promo 2: Discount */}
          <div className="relative rounded-xl overflow-hidden h-[300px] group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ 
                backgroundImage: `url('https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <span className="text-sm uppercase tracking-wider font-medium">Limited Time Offer</span>
              <h3 className="text-2xl font-bold mb-2">Up to 70% Discount!</h3>
              <button className="bg-white text-blue-900 py-2 px-4 rounded-md text-sm font-medium mt-4 hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoSections;