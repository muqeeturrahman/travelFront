import React, { useState } from 'react';
import { Search, Calendar, UserPlus, MapPin } from 'lucide-react';
import SearchForm from './SearchForm';

function Hero() {
  const [activeTab, setActiveTab] = useState('hotels');
  
  const tabs = [
    { id: 'hotels', label: 'Hotels', icon: <MapPin className="w-4 h-4" /> },
    { id: 'tours', label: 'Tours', icon: <MapPin className="w-4 h-4" /> },
    { id: 'activity', label: 'Activity', icon: <MapPin className="w-4 h-4" /> },
    { id: 'rentals', label: 'Rentals', icon: <MapPin className="w-4 h-4" /> },
    { id: 'cars', label: 'Cars', icon: <MapPin className="w-4 h-4" /> },
    { id: 'flights', label: 'Flights', icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <div className="relative h-[500px] bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center text-center ">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-30 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-12 md:pt-0">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Find Next Place To Visit
        </h1>
        <p className="text-gray-200 text-sm md:text-base mb-8">
          Discover amazing places at exclusive deals
        </p>
        
        {/* Tabs and Search Form */}
        <div className="bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center justify-center min-w-[100px] px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>
          
          {/* Search Form */}
          <SearchForm activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}

export default Hero;