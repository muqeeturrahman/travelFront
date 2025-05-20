import React from 'react';
import { ChevronRight } from 'lucide-react';
import DestinationCard from '../shared/DestinationCard';

function PopularDestinations() {
  const destinations = [
    {
      id: 1,
      name: 'New York',
      imageUrl: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      properties: 277
    },
    {
      id: 2,
      name: 'London',
      imageUrl: 'https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      properties: 188
    },
    {
      id: 3,
      name: 'Barcelona',
      imageUrl: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      properties: 112
    },
    {
      id: 4,
      name: 'Sydney',
      imageUrl: 'https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      properties: 209
    },
    {
      id: 5,
      name: 'Rome',
      imageUrl: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      properties: 124
    }
  ];

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Popular Destinations</h2>
          <a 
            href="#" 
            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-sm font-medium"
          >
            View All Destinations <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {destinations.map(destination => (
            <DestinationCard 
              key={destination.id}
              name={destination.name}
              imageUrl={destination.imageUrl}
              properties={destination.properties}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularDestinations;