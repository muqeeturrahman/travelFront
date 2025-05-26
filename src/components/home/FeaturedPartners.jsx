import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

// Representative list of airlines
const featuredAirlines = [
  { carrierCode: 'QF', name: 'Qantas' },       // Australian
  { carrierCode: 'VA', name: 'Virgin Australia' }, // Australian
  { carrierCode: 'EK', name: 'Emirates' },     // UAE
  { carrierCode: 'EY', name: 'Etihad Airways' }, // UAE
  { carrierCode: 'QR', name: 'Qatar Airways' },  // Famous International (from UAE region but globally recognized)
  { carrierCode: 'SQ', name: 'Singapore Airlines' }, // Famous International
  { carrierCode: 'LH', name: 'Lufthansa' },    // Famous International
  { carrierCode: 'BA', name: 'British Airways' }, // Famous International
  { carrierCode: 'AA', name: 'American Airlines' }, // Famous International
  { carrierCode: 'AC', name: 'Air Canada' },   // Famous International
  { carrierCode: 'AF', name: 'Air France' },   // More International
  { carrierCode: 'KL', name: 'KLM' },        // More International
  { carrierCode: 'CX', name: 'Cathay Pacific' }, // More International
  { carrierCode: 'JL', name: 'Japan Airlines' }, // More International
  { carrierCode: 'KE', name: 'Korean Air' },   // More International
  { carrierCode: 'SA', name: 'South African Airways' }, // More International
  { carrierCode: 'NZ', name: 'Air New Zealand' }, // More International
];

function FeaturedPartners() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Featured Partners</h2>
        <p className="text-gray-600 mb-6">Domestic & International Airlines</p>

        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={3} // Show 3 logos on smaller screens
            autoplay={{
              delay: 2500, // Auto-slide every 2.5 seconds
              disableOnInteraction: false, // Keep sliding even if user interacts
            }}
            loop={true} // Loop the slider
            breakpoints={{
              // Adjust slides per view based on screen size
              640: { slidesPerView: 4, spaceBetween: 40 },
              768: { slidesPerView: 5, spaceBetween: 50 },
              1024: { slidesPerView: 6, spaceBetween: 60 },
              1280: { slidesPerView: 7, spaceBetween: 70 },
            }}
            className="featured-partners-swiper"
          >
            {featuredAirlines.map((airline) => (
              <SwiperSlide key={airline.carrierCode}>
                <div className="flex items-center justify-center">
                  <img
                    src={`https://content.airhex.com/content/logos/airlines_${airline.carrierCode}_350_100_r.png?proportions=keep`}
                    alt={`${airline.name} logo`}
                    className="h-8 sm:h-10 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      // Fallback text or a placeholder image if the logo fails to load
                      e.target.src = `https://via.placeholder.com/100x30?text=${airline.carrierCode}`;
                      e.target.alt = `${airline.name} logo (not available)`;
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* Note: Swiper handles its own styling, so hide-scrollbar class might not be needed depending on Swiper version/styles */}
    </section>
  );
}

export default FeaturedPartners; 