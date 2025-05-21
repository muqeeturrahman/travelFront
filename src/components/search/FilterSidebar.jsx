import React from 'react';
import PropTypes from 'prop-types';
import { Sliders, Clock, Plane, DollarSign } from 'lucide-react';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const formatPrice = (price) => `$${Math.round(price)}`;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 mb-6">
        <Sliders className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Price Range
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
          <input
            type="range"
            min={filters.minPrice}
            max={filters.maxPrice}
            value={filters.priceRange[1]}
            onChange={(e) => onFilterChange('priceRange', [filters.minPrice, Number(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>

      {/* Stops Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Plane className="h-4 w-4" />
          Stops
        </h3>
        <div className="space-y-2">
          {['Non-stop', '1 Stop', '2+ Stops'].map((stop, index) => (
            <label key={stop} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.stops.includes(index)}
                onChange={() => {
                  const newStops = filters.stops.includes(index)
                    ? filters.stops.filter(s => s !== index)
                    : [...filters.stops, index];
                  onFilterChange('stops', newStops);
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{stop}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Duration
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{Math.floor(filters.duration[0])}h</span>
            <span>{Math.floor(filters.duration[1])}h</span>
          </div>
          <input
            type="range"
            min={filters.minDuration}
            max={filters.maxDuration}
            value={filters.duration[1]}
            onChange={(e) => onFilterChange('duration', [filters.minDuration, Number(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>

      {/* Airlines Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Airlines</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {filters.availableAirlines.map((airline) => (
            <label key={airline} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.airlines.includes(airline)}
                onChange={() => {
                  const newAirlines = filters.airlines.includes(airline)
                    ? filters.airlines.filter(a => a !== airline)
                    : [...filters.airlines, airline];
                  onFilterChange('airlines', newAirlines);
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{airline}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Travel Class Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Travel Class</h3>
        <div className="space-y-2">
          {['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'].map((travelClass) => (
            <label key={travelClass} className="flex items-center">
              <input
                type="radio"
                name="travelClass"
                value={travelClass}
                checked={filters.travelClass === travelClass}
                onChange={(e) => onFilterChange('travelClass', e.target.value)}
                className="border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                {travelClass.split('_').map(word => 
                  word.charAt(0) + word.slice(1).toLowerCase()
                ).join(' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={() => onFilterChange('reset')}
        className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Reset Filters
      </button>
    </div>
  );
};

FilterSidebar.propTypes = {
  filters: PropTypes.shape({
    priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
    minPrice: PropTypes.number.isRequired,
    maxPrice: PropTypes.number.isRequired,
    stops: PropTypes.arrayOf(PropTypes.number).isRequired,
    duration: PropTypes.arrayOf(PropTypes.number).isRequired,
    minDuration: PropTypes.number.isRequired,
    maxDuration: PropTypes.number.isRequired,
    airlines: PropTypes.arrayOf(PropTypes.string).isRequired,
    availableAirlines: PropTypes.arrayOf(PropTypes.string).isRequired,
    travelClass: PropTypes.string.isRequired
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default FilterSidebar; 