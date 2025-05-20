import React from 'react';
import { Star, MapPin, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import HotelCard from '../shared/HotelCard';

const RecommendedHotels = () => {
  const hotels = [
    {
      id: 1,
      name: 'The Montcalm At Brewery London City',
      location: 'Westminster Borough, London',
      rating: 4.85,
      reviews: 3014,
      price: 72,
      imageUrl:
        'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['breakfast', 'wifi', 'spa', 'bar'],
    },
    {
      id: 2,
      name: 'Staycity Aparthotels Deptford Bridge Station',
      location: 'Canal Walk, Barcelona',
      rating: 4.7,
      reviews: 2014,
      price: 85,
      imageUrl:
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['breakfast', 'wifi', 'spa'],
    },
    {
      id: 3,
      name: 'The Westin New York at Times Square West',
      location: 'Manhattan, New York',
      rating: 4.9,
      reviews: 3514,
      price: 68,
      imageUrl:
        'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['breakfast', 'wifi', 'spa', 'bar'],
    },
    {
      id: 4,
      name: 'DoubleTree by Hilton Hotel New York Times Square West',
      location: 'Vaticano Prati, Rome',
      rating: 4.6,
      reviews: 3214,
      price: 89,
      imageUrl:
        'https://images.pexels.com/photos/11489774/pexels-photo-11489774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['breakfast', 'wifi', 'spa', 'bar'],
    },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Recommended</h2>
            <p className="text-gray-500 text-sm">Discover our best offers for you</p>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              name={hotel.name}
              location={hotel.location}
              rating={hotel.rating}
              reviews={hotel.reviews}
              price={hotel.price}
              imageUrl={hotel.imageUrl}
              features={hotel.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedHotels;
