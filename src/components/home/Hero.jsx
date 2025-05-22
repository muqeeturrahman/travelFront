import React, { useState } from 'react';
import { Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';

function Hero() {
  const navigate = useNavigate();
  // Set flights as default active tab
  const [activeTab] = useState('flights');
  
  const handleSearch = (searchParams) => {
    navigate('/search', {
      state: {
        searchParams
      }
    });
  };

  return (
    <div className="relative h-[500px] bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center text-center">
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
        
        {/* Search Form Container */}
        <div className="bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
          {/* Single Tab Header */}
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-center py-4">
              <Plane className="h-5 w-5 text-blue-600" />
              <span className="ml-2 font-semibold text-blue-600">Flight Search</span>
            </div>
          </div>
          
          {/* Search Form */}
          <SearchForm 
            activeTab={activeTab} 
            onSearch={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;