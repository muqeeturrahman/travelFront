import React from 'react';
import { Search } from 'lucide-react';

const FilterSidebar = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <div className="font-medium text-lg mb-4">Search by property name</div>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. Best Western"
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="font-medium text-lg mb-4">Deals</div>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
            <span className="ml-2 text-gray-700">Free cancellation</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
            <span className="ml-2 text-gray-700">Reserve now, pay at stay</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
            <span className="ml-2 text-gray-700">Properties with special offers</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <div className="font-medium text-lg mb-4">Popular Filters</div>
        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">Breakfast Included</span>
            </div>
            <span className="text-gray-500 text-sm">92</span>
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">WiFi Included</span>
            </div>
            <span className="text-gray-500 text-sm">45</span>
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">Airport Transfer</span>
            </div>
            <span className="text-gray-500 text-sm">21</span>
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">5 Star</span>
            </div>
            <span className="text-gray-500 text-sm">679</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <div className="font-medium text-lg mb-4">Nightly Price</div>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 text-sm">$0</span>
            <span className="text-gray-600 text-sm">$500</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="500" 
            defaultValue="250" 
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="font-medium text-lg mb-4">Amenities</div>
        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">Breakfast Included</span>
            </div>
            <span className="text-gray-500 text-sm">92</span>
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">WiFi Included</span>
            </div>
            <span className="text-gray-500 text-sm">45</span>
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">Airport Transfer</span>
            </div>
            <span className="text-gray-500 text-sm">21</span>
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">5 Star</span>
            </div>
            <span className="text-gray-500 text-sm">679</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <div className="font-medium text-lg mb-4">Star Rating</div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button 
              key={star} 
              className="flex items-center justify-center h-8 w-8 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50"
            >
              {star}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="font-medium text-lg mb-4">Guest Rating</div>
        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="radio" name="guest-rating" className="text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">Any</span>
            </div>
            <span className="text-gray-500 text-sm">92</span>
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="radio" name="guest-rating" className="text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">Wonderful 4.5+</span>
            </div>
            <span className="text-gray-500 text-sm">45</span>
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="radio" name="guest-rating" className="text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">Very good 4+</span>
            </div>
            <span className="text-gray-500 text-sm">21</span>
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="radio" name="guest-rating" className="text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">Good 3.5+</span>
            </div>
            <span className="text-gray-500 text-sm">78</span>
          </label>
        </div>
      </div>

      <div>
        <div className="font-medium text-lg mb-4">Neighborhood</div>
        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">Central London</span>
            </div>
            <span className="text-gray-500 text-sm">92</span>
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">Bayswater</span>
            </div>
            <span className="text-gray-500 text-sm">45</span>
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">Westminster Borough</span>
            </div>
            <span className="text-gray-500 text-sm">31</span>
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">Kensington and Chelsea</span>
            </div>
            <span className="text-gray-500 text-sm">51</span>
          </label>
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="ml-2 text-gray-700">Oxford Street</span>
            </div>
            <span className="text-gray-500 text-sm">21</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar; 