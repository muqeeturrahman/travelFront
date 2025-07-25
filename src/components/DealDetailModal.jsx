import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const DealDetailModal = ({ dealId, onClose }) => {
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!dealId) return;

    const fetchDealDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://travey-backend.vercel.app/api/user/getDealById/${dealId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.success) {
          setDeal(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch deal details');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDealDetails();
  }, [dealId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">{deal ? deal.title : 'Loading...'}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {loading && <p>Loading details...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {deal && (
            <div>
              <div className="w-full flex justify-center items-center bg-white mb-6" style={{ height: '420px', minHeight: '400px' }}>
                <img
                  src={deal.picture}
                  alt={deal.title}
                  className="object-contain w-full h-full rounded-lg"
                  style={{ background: 'white' }}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                <div>
                  <h3 className="text-xl font-semibold mb-3">About this tour</h3>
                  <p className="text-gray-700">{deal.aboutThisTour}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {deal.highlights && deal.highlights.map((highlight, index) => <li key={index}>{highlight}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Included</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {deal.included && deal.included.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Excluded</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {deal.excluded && deal.excluded.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-1">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Flight Options</h3>
                  <p className="text-gray-700 mb-2">{deal.flightOptions}</p>
                  <h3 className="text-xl font-semibold mb-1">Hotel Stays</h3>
                  <p className="text-gray-700 mb-2">{deal.hotelStays}</p>
                  <h3 className="text-xl font-semibold mb-1">Duration</h3>
                  <p className="text-gray-700 mb-2">{deal.duration}</p>
                  <h3 className="text-xl font-semibold mb-1">Available From</h3>
                  <p className="text-gray-700 mb-2">{deal.availableFrom}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Price</h3>
                  <p className="text-gray-700 mb-2">{deal.price} {deal.currency}</p>
                  <h3 className="text-xl font-semibold mb-1">Booking Type</h3>
                  <p className="text-gray-700 mb-2">{deal.bookingType}</p>
                  <h3 className="text-xl font-semibold mb-1">Visa Required</h3>
                  <p className="text-gray-700 mb-2">{deal.visaRequired ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t flex justify-end gap-2">
          <a
            href={`https://wa.me/61480810519`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            Book on WhatsApp
          </a>
          <a
            href={`tel:+61290984324`}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Call to Book
          </a>
          <button 
            onClick={onClose}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealDetailModal; 