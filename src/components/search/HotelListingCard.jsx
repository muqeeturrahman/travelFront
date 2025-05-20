import React from 'react';

function HotelListingCard({ hotel }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
        <p className="text-gray-600 mb-2">{hotel.location}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{hotel.rating}</span>
          </div>
          <span className="text-lg font-bold">${hotel.price}/night</span>
        </div>
      </div>
    </div>
  );
}

export default HotelListingCard; 