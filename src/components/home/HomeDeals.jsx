import React, { useState, useEffect } from 'react';
import DealDetailModal from '../DealDetailModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

const HomeDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDealId, setSelectedDealId] = useState(null);

  const whatsappNumber = '+61480810519';
  const phoneNumber = '+61480810519';

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('https://travey-backend.vercel.app/api/user/getDeals');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.success) {
          setDeals(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch deals');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleViewDealClick = (dealId) => {
    setSelectedDealId(dealId);
  };

  const handleCloseModal = () => {
    setSelectedDealId(null);
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Exclusive Travel Deals</h2>
        </div>
        {loading ? (
          <div className="text-center py-10">Loading deals...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!pb-8"
          >
            {deals.map((deal) => {
              // Calculate original price (20% higher)
              let discountedPrice = deal.price;
              let originalPrice = null;
              // Try to extract numeric value from price string
              const priceMatch = String(deal.price).match(/([A-Z$]+)\s?(\d+(?:\.\d+)?)/i);
              if (priceMatch) {
                const currency = priceMatch[1];
                const priceNum = parseFloat(priceMatch[2]);
                const origNum = Math.round(priceNum * 1.2);
                originalPrice = `${currency} ${origNum} Return`;
              }
              return (
                <SwiperSlide key={deal._id}>
                  <div
                    className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group flex flex-col"
                    style={{ minHeight: '600px', height: '700px' }}
                  >
                    <div className="relative flex-1 flex items-center justify-center bg-white" style={{ minHeight: '400px', height: '420px' }}>
                      <div className="w-full h-full flex items-center justify-center bg-white">
                        <img
                          src={deal.picture}
                          alt={deal.title}
                          className="object-cover w-full h-full"
                          style={{ background: 'white' }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 pointer-events-none"></div>
                    </div>
                    <div className="p-6 flex flex-col flex-shrink-0">
                      {/* Price Display */}
                      <div className="mb-2 flex items-baseline gap-2">
                        {originalPrice && (
                          <span className="text-gray-400 line-through text-lg font-semibold">{originalPrice}</span>
                        )}
                        <span className="text-2xl font-bold text-blue-600">{discountedPrice}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-3 flex-grow">{deal.title}</h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{deal.aboutThisTour}</p>
                      <button
                        onClick={() => handleViewDealClick(deal._id)}
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 mt-auto"
                      >
                        View Deal
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
      {selectedDealId && <DealDetailModal dealId={selectedDealId} onClose={handleCloseModal} />}
    </section>
  );
};

export default HomeDeals; 