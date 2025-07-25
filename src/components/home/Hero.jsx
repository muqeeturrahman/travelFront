import React, { useState, useEffect } from 'react';
import { Plane, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';

function Hero() {
  const navigate = useNavigate();
  const [activeTab] = useState('flights');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample banner images - replace these URLs with your actual banner images
  const bannerImages = [
    {
      url: "https://palkitravel.com.au/wp-content/uploads/al_opt_content/IMAGE/palkitravel.com.au/wp-content/uploads/2025/07/referearn.webp.bv.webp?bv_host=palkitravel.com.au",
      title: "Find Next Place To Visit",
      subtitle: "Earn $10 for every successful referral"
    },
    {
      url: "https://palkitravel.com.au/wp-content/uploads/al_opt_content/IMAGE/palkitravel.com.au/wp-content/uploads/2025/06/time-to-travel-banner.jpg.bv_resized_desktop.jpg.bv.webp?bv_host=palkitravel.com.au&quot",
      title: "Fly to India Super Sale",
      subtitle: "Fares starting from $499"
    },
    {
      url: "https://palkitravel.com.au/wp-content/uploads/al_opt_content/IMAGE/palkitravel.com.au/wp-content/uploads/2025/07/referearn.webp.bv.webp?bv_host=palkitravel.com.au",
      title: "Discover Amazing Destinations",
      subtitle: "Book your dream vacation today"
    },
    {
      url: "https://palkitravel.com.au/wp-content/uploads/al_opt_content/IMAGE/palkitravel.com.au/wp-content/uploads/2025/06/time-to-travel-banner.jpg.bv_resized_desktop.jpg.bv.webp?bv_host=palkitravel.com.au&quot",
      title: "Best Travel Deals",
      subtitle: "Exclusive offers for our customers"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const handleSearch = (searchParams) => {
    navigate('/search', {
      state: {
        searchParams,
      },
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <div className="relative min-h-[600px] md:h-[500px] flex items-start md:items-center justify-center text-center px-4 py-8 md:py-0 overflow-hidden">
      
      {/* Animated Background Images */}
      <div className="absolute inset-0 z-0">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
            style={{ 
              backgroundImage: `url("${image.url}")`,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)'
            }}
          />
        ))}
      </div>

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 z-5 bg-black opacity-40"></div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-110' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Dynamic Title based on current slide */}
        <div className="mb-8">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fadeIn">
            {bannerImages[currentSlide].title}
          </h1>
          <p className="text-gray-200 text-sm md:text-base animate-fadeIn">
            {bannerImages[currentSlide].subtitle}
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-slideUp">
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-center py-3 md:py-4">
              <Plane className="h-5 w-5 text-blue-600" />
              <span className="ml-2 font-semibold text-blue-600">Flight Search</span>
            </div>
          </div>

          <SearchForm 
            activeTab={activeTab} 
            onSearch={handleSearch} 
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 1s ease-out;
        }

        /* Smooth transition for background images */
        .bg-transition {
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}

export default Hero;