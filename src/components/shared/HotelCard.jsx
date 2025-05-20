import React from 'react';
import PropTypes from 'prop-types';
import { Star, MapPin, Heart } from 'lucide-react';

function HotelCard({
  name,
  location,
  rating,
  reviews,
  price,
  imageUrl,
  features
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-[200px] object-cover"
        />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-rose-500 hover:bg-white transition-colors">
          <Heart className="h-5 w-5" />
        </button>
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
          Top Rated
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex mr-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-gray-700">{reviews} reviews</span>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-1 text-lg leading-tight">{name}</h3>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div>
            <span className="font-bold text-xl text-gray-900">${price}</span>
            <span className="text-gray-500 text-sm">/night</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

HotelCard.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default HotelCard;