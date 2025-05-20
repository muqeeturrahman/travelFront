import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, MapPin, Calendar, UserPlus } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3008';

function SearchForm({ activeTab }) {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('oneway');
  const cities = [
    { name: "New York", code: "NYC" },
    { name: "London", code: "LON" },
    { name: "Paris", code: "PAR" },
    { name: "Tokyo", code: "TYO" },
    { name: "Dubai", code: "DXB" },
    { name: "Singapore", code: "SIN" },
    { name: "Los Angeles", code: "LAX" },
    { name: "Hong Kong", code: "HKG" },
    { name: "Sydney", code: "SYD" },
    { name: "Rome", code: "ROM" },
    { name: "Bangkok", code: "BKK" },
    { name: "Amsterdam", code: "AMS" },
    { name: "Mumbai", code: "BOM" },
    { name: "Shanghai", code: "SHA" },
    { name: "Istanbul", code: "IST" }
  ];

  const [flightData, setFlightData] = useState({
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    max: 5,
    currencyCode: 'AUD',
    travelClass: 'ECONOMY'
  });

  const [addPlace, setAddPlace] = useState(false);
  const [addCar, setAddCar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flightOffers, setFlightOffers] = useState([]);
  const [error, setError] = useState(null);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [showTravelerDropdown, setShowTravelerDropdown] = useState(false);

  const totalPassengers =
    (+flightData.adults || 0) +
    (+flightData.children || 0) +
    (+flightData.infants || 0);

  const handleCitySearch = (value, type) => {
    const searchTerm = value.toLowerCase();
    const filteredCities = cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm) ||
      city.code.toLowerCase().includes(searchTerm)
    );

    if (type === "from") {
      setFromSuggestions(filteredCities);
      setShowFromSuggestions(true);
    } else {
      setToSuggestions(filteredCities);
      setShowToSuggestions(true);
    }
  };

  const extractAirportCode = (input) => {
    const match = input.match(/\(([A-Z]{3})\)/);
    return match ? match[1] : input;
  };

  const handleFlightSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      max,
      currencyCode,
      travelClass
    } = flightData;

    try {
      // Extract codes
      const originCode = extractAirportCode(originLocationCode);
      const destinationCode = extractAirportCode(destinationLocationCode);

      // ✅ Frontend validation
      if (!originCode || !destinationCode || !departureDate || !adults || !currencyCode) {
        toast.error("Please fill all required fields.");
        return setLoading(false);
      }

      if (returnDate && new Date(returnDate) < new Date(departureDate)) {
        toast.error("Return date cannot be earlier than departure date.");
        return setLoading(false);
      }

      // ✅ Build FormData
      const formData = new URLSearchParams();
      formData.append("originLocationCode", originCode);
      formData.append("destinationLocationCode", destinationCode);
      formData.append("departureDate", departureDate);
      formData.append("adults", adults);
      formData.append("max", max || 5);
      formData.append("currencyCode", currencyCode);
      if (returnDate) formData.append("returnDate", returnDate);
      if (travelClass) formData.append("travelClass", travelClass);
      if (flightData.children) formData.append("children", flightData.children);
      if (flightData.infants) formData.append("infants", flightData.infants);

      const response = await axios.post(`${API_URL}/api/user/flightOffers`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      // Store the flight offers in state
      setFlightOffers(response.data.data);

      // Navigate to search page with the search results and parameters
      navigate('/search', {
        state: {
          flightOffers: response.data.data.data,
          searchParams: {
            ...flightData,
            tripType
          }
        }
      });

    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong while fetching flight offers";
      setError(message);
      console.error("Flight search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlightData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
    if (type === 'oneway') {
      setFlightData(prev => ({ ...prev, returnDate: '' }));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDuration = (duration) => {
    // PT16H10M -> 16h 10m
    const hours = duration.match(/(\d+)H/)?.[1] || '0';
    const minutes = duration.match(/(\d+)M/)?.[1] || '0';
    return `${hours}h ${minutes}m`;
  };

  if (activeTab === 'flights') {
    return (
      <div className="relative" style={{ zIndex: 50 }}>
        <form onSubmit={handleFlightSearch} className="p-4 space-y-4">
          {/* Subtabs */}
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={() => handleTripTypeChange('oneway')}
              className={`px-4 py-2 rounded-md border ${tripType === 'oneway' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              One Way
            </button>
            <button
              type="button"
              onClick={() => handleTripTypeChange('roundtrip')}
              className={`px-4 py-2 rounded-md border ${tripType === 'roundtrip' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              Round Trip
            </button>
          </div>

          {/* Inputs and Submit in One Row */}
          <div className="flex flex-wrap gap-4 items-end relative">
            {/* Leaving From */}
            <div className="relative flex-1 min-w-[180px]">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="originLocationCode"
                placeholder="Leaving from"
                value={flightData.originLocationCode}
                onChange={(e) => {
                  handleInputChange(e);
                  handleCitySearch(e.target.value, "from");
                }}
                onFocus={() => setShowFromSuggestions(true)}
                onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {showFromSuggestions && fromSuggestions.length > 0 && (
                <div className="absolute  z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto"
                  style={{
                    top: '100%',
                    left: 0,
                    maxHeight: '300px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                  }}>
                  {fromSuggestions.map((city, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      onClick={() => {
                        setFlightData(prev => ({
                          ...prev,
                          originLocationCode: `${city.name} (${city.code})`
                        }));
                        setShowFromSuggestions(false);
                      }}
                    >
                      {city.name} ({city.code})
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Going To */}
            <div className="relative flex-1 min-w-[180px]">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="destinationLocationCode"
                placeholder="Going to"
                value={flightData.destinationLocationCode}
                onChange={(e) => {
                  handleInputChange(e);
                  handleCitySearch(e.target.value, "to");
                }}
                onFocus={() => setShowToSuggestions(true)}
                onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {showToSuggestions && toSuggestions.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto"
                  style={{
                    top: 'calc(100% + 5px)',
                    left: 0,
                    maxHeight: '300px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                  }}>
                  {toSuggestions.map((city, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      onClick={() => {
                        setFlightData(prev => ({
                          ...prev,
                          destinationLocationCode: `${city.name} (${city.code})`
                        }));
                        setShowToSuggestions(false);
                      }}
                    >
                      {city.name} ({city.code})
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dates */}
            {tripType === 'oneway' ? (
              <div className="relative flex-1 min-w-[180px]">
                <input
                  type="date"
                  name="departureDate"
                  value={flightData.departureDate}
                  onChange={handleInputChange}
                  className="pl-10 pr-4 py-2 w-full border text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ) : (
              <div className="flex flex-1 min-w-[300px] gap-2">
                {/* Departure Date */}
                <div className="relative w-1/2">
                  <input
                    type="date"
                    name="departureDate"
                    value={flightData.departureDate}
                    onChange={handleInputChange}
                    className="px-4 py-2 w-full text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                {/* Return Date */}
                <div className="relative w-1/2">
                  <input
                    type="date"
                    name="returnDate"
                    value={flightData.returnDate || ''}
                    onChange={handleInputChange}
                    className="px-4 py-2 w-full text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={tripType === 'roundtrip'}
                  />
                </div>
              </div>
            )}
            {/* Traveler */}
            <div className="relative flex-1 min-w-[180px]">
              <UserPlus className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <div
                className="pl-10 pr-4 py-2 w-full border rounded-md focus-within:ring-2 focus-within:ring-blue-500 bg-white cursor-pointer"
                onClick={() => setShowTravelerDropdown(!showTravelerDropdown)}
              >
                {totalPassengers ? `${totalPassengers} Passenger${totalPassengers > 1 ? 's' : ''}` : 'Passengers'}
              </div>

              {showTravelerDropdown && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 p-4 space-y-3">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700 font-medium">Adults</p>
                      <p className="text-xs text-gray-500">&gt;12 years</p>
                    </div>
                    <input
                      type="number"
                      id="adults"
                      name="adults"
                      min={0}
                      max={9}
                      placeholder="0"
                      value={flightData.adults === 0 ? '' : flightData.adults}
                      onChange={handleInputChange}
                      className="w-16 border rounded-md px-2 py-1 text-center"
                    />
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700 font-medium">Children</p>
                      <p className="text-xs text-gray-500">2–12 years</p>
                    </div>
                    <input
                      type="number"
                      id="children"
                      name="children"
                      min={0}
                      max={9}
                      placeholder="0"
                      value={flightData.children === 0 ? '' : flightData.children}
                      onChange={handleInputChange}
                      className="w-16 border rounded-md px-2 py-1 text-center"
                    />
                  </div>

                  {/* Infants */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700 font-medium">Infants</p>
                      <p className="text-xs text-gray-500">&lt;2 years</p>
                    </div>
                    <input
                      type="number"
                      id="infants"
                      name="infants"
                      min={0}
                      max={9}
                      placeholder="0"
                      value={flightData.infants === 0 ? '' : flightData.infants}
                      onChange={handleInputChange}
                      className="w-16 border rounded-md px-2 py-1 text-center"
                    />
                  </div>

                  {/* Travel Class */}
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-gray-700 font-medium mb-2">Travel Class</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="travelClass" 
                          value="ECONOMY" 
                          checked={flightData.travelClass === 'ECONOMY'} 
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Economy</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="travelClass" 
                          value="PREMIUM_ECONOMY" 
                          checked={flightData.travelClass === 'PREMIUM_ECONOMY'} 
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Premium Economy</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="travelClass" 
                          value="BUSINESS" 
                          checked={flightData.travelClass === 'BUSINESS'} 
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Business</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="travelClass" 
                          value="FIRST" 
                          checked={flightData.travelClass === 'FIRST'} 
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">First Class</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowTravelerDropdown(false)}
                    className="w-full mt-4 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-4 mt-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={addPlace} onChange={() => setAddPlace(!addPlace)} />
              <span>Add a place to stay</span>
            </label>

            {tripType === 'roundtrip' && (
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={addCar} onChange={() => setAddCar(!addCar)} />
                <span>Add a car</span>
              </label>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200 mt-4">
              {error}
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-lg"
            >
              Search Flights
            </button>
          </div>
        </form>

        {/* Flight Offers Results */}
        {flightOffers.length > 0 && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Available Flights</h2>
            <div className="space-y-4">
              {flightOffers.map((offer, index) => (
                <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        {offer.itineraries[0].segments[0].departure.iataCode} →
                        {offer.itineraries[0].segments.slice(-1)[0].arrival.iataCode}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(offer.itineraries[0].segments[0].departure.at)} •
                        {formatDuration(offer.itineraries[0].duration)}
                      </p>
                      <p className="text-sm">
                        {offer.itineraries[0].segments.length - 1} stop(s)
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${offer.price.total}</p>
                      <p className="text-sm text-gray-600">{offer.travelerPricings.length} traveler(s)</p>
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium mb-2">Flight Details:</h4>
                    {offer.itineraries[0].segments.map((segment, segIndex) => (
                      <div key={segIndex} className="mb-3">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">
                            {segment.departure.iataCode} → {segment.arrival.iataCode}
                          </span>
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {segment.carrierCode} {segment.number}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Depart: {new Date(segment.departure.at).toLocaleTimeString()} •
                          Arrive: {new Date(segment.arrival.at).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

SearchForm.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default SearchForm;