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
    <div className="relative min-h-[600px] md:h-[500px] bg-gradient-to-r from-blue-900 to-purple-900 flex items-start md:items-center justify-center text-center px-4 py-8 md:py-0">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-30 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Find Next Place To Visit
          </h1>
          <p className="text-gray-200 text-sm md:text-base">
            Discover amazing places at exclusive deals
          </p>
        </div>
        
        {/* Search Form Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Single Tab Header */}
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-center py-3 md:py-4">
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