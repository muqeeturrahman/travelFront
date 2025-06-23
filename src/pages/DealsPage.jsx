import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import DealDetailModal from '../components/DealDetailModal';

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDealId, setSelectedDealId] = useState(null);

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

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10">Loading deals...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-10 text-red-500">Error: {error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Exclusive Travel Deals</h1>
            <p className="text-lg text-gray-600">Handpicked adventures for your next unforgettable journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {deals.map((deal) => (
              <div key={deal._id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
                <div className="relative">
                  <img src={deal.picture} alt={deal.title} className="w-full h-56 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                </div>
                <div className="p-6 flex flex-col">
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
            ))}
          </div>
        </div>
      </div>
      {selectedDealId && <DealDetailModal dealId={selectedDealId} onClose={handleCloseModal} />}
    </Layout>
  );
};

export default DealsPage; 