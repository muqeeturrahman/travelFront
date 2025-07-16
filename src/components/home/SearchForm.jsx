import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Search, MapPin, Calendar, UserPlus, DollarSign, Plane } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cities } from '../../constants/cities';
import { currencies } from '../../constants/currencies';
import TravelerDropdown from './TravelerDropdown';
import { z } from 'zod';

const API_URL = import.meta.env.VITE_API_URL || 'https://travey-backend.vercel.app';

const DEFAULT_CURRENCY = 'USD';

// Validation function moved outside component
const validateCurrencyCode = (code) => {
  return code && currencies.some(currency => currency.code === code);
};

const initialFlightData = {
  originLocationCode: '',
  destinationLocationCode: '',
  departureDate: '',
  returnDate: '',
  adults: 1,
  children: 0,
  infants: 0,
  max: 100,
  currencyCode: DEFAULT_CURRENCY,
  travelClass: 'ECONOMY',
  page: 1,
  limit: 10
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatDuration = (duration) => {
  const hours = duration.match(/(\d+)H/)?.[1] || '0';
  const minutes = duration.match(/(\d+)M/)?.[1] || '0';
  return `${hours}h ${minutes}m`;
};

const extractAirportCode = (input) => {
  const match = input.match(/\(([A-Z]{3})\)/);
  return match ? match[1] : input;
};

// Create a Zod schema for city validation
const citySchema = z.object({
  name: z.string(),
  code: z.string()
});

// Create a validation schema for the flight search form
const flightSearchSchema = z.object({
  originLocationCode: z.string().refine(
    (value) => {
      // Extract city and code from string like "New York (NYC)"
      const match = value.match(/^(.+)\s*\(([A-Z]{3})\)$/);
      if (!match) return false;
      const [_, cityName, code] = match;
      return cities.some(city => city.name === cityName.trim() && city.code === code);
    },
    { message: "Origin city must be selected from the dropdown" }
  ),
  destinationLocationCode: z.string().refine(
    (value) => {
      const match = value.match(/^(.+)\s*\(([A-Z]{3})\)$/);
      if (!match) return false;
      const [_, cityName, code] = match;
      return cities.some(city => city.name === cityName.trim() && city.code === code);
    },
    { message: "Destination city must be selected from the dropdown" }
  ),
  departureDate: z.string().min(1, "Departure date is required"),
  returnDate: z.string().optional(),
  adults: z.number().min(1, "At least one adult is required"),
  children: z.number().min(0).optional(),
  infants: z.number().min(0).optional(),
  max: z.number().optional(),
  currencyCode: z.string().min(1, "Currency code is required"),
  travelClass: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional()
});

function SearchForm({ activeTab, onSearch, initialSearchParams }) {
  const navigate = useNavigate();

  // Initialize state with validated currency
  const getInitialFlightData = () => {
    const initialData = initialSearchParams || initialFlightData;
    return {
      ...initialData,
      currencyCode: validateCurrencyCode(initialData.currencyCode) 
        ? initialData.currencyCode 
        : DEFAULT_CURRENCY
    };
  };

  const [tripType, setTripType] = useState('oneway');
  const [flightData, setFlightData] = useState(getInitialFlightData);
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
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const totalPassengers = useMemo(() => 
    (+flightData.adults || 0) + (+flightData.children || 0) + (+flightData.infants || 0),
    [flightData.adults, flightData.children, flightData.infants]
  );

  // Get current currency with validation
  const currentCurrency = useMemo(() => {
    const found = currencies.find(c => c.code === flightData.currencyCode);
    return found || currencies.find(c => c.code === DEFAULT_CURRENCY);
  }, [flightData.currencyCode]);

  // Handle currency change with validation
  const handleCurrencyChange = useCallback((newCurrencyCode) => {
    if (validateCurrencyCode(newCurrencyCode)) {
      setFlightData(prev => ({ ...prev, currencyCode: newCurrencyCode }));
    } else {
      console.warn(`Invalid currency code: ${newCurrencyCode}, defaulting to ${DEFAULT_CURRENCY}`);
      setFlightData(prev => ({ ...prev, currencyCode: DEFAULT_CURRENCY }));
    }
    setShowCurrencyDropdown(false);
  }, []);

  // Validate currency on mount and when initialSearchParams changes
  useEffect(() => {
    if (!validateCurrencyCode(flightData.currencyCode)) {
      setFlightData(prev => ({ ...prev, currencyCode: DEFAULT_CURRENCY }));
    }
  }, [flightData.currencyCode]);

  const handleCitySearch = useCallback((value, type) => {
        const searchTerm = value.toLowerCase();
    const filteredCities = cities      .filter(city =>
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
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, type } = e.target;
    
    // Convert number fields to numbers
    const numberFields = ['adults', 'children', 'infants', 'max', 'page', 'limit'];
    setFlightData(prev => ({
      ...prev,
      [name]: numberFields.includes(name) ? Number(value) : value
    }));
  }, []);

  const handleTripTypeChange = useCallback((type) => {
    setTripType(type);
    if (type === 'oneway') {
      setFlightData(prev => ({ ...prev, returnDate: '' }));
    }
  }, []);

  const handleFlightSearch = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Log the raw form data
    console.log('[Flight Search] Raw flightData:', flightData);

    try {
      // Validate the form data using Zod
      const validatedData = flightSearchSchema.parse(flightData);
      console.log('[Flight Search] Validated data:', validatedData);

      const {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        adults,
        max,
        currencyCode,
        travelClass,
        page,
        limit
      } = validatedData;

      const originCode = extractAirportCode(originLocationCode);
      const destinationCode = extractAirportCode(destinationLocationCode);

      if (!originCode || !destinationCode || !departureDate || !adults) {
        toast.error("Please fill all required fields.");
        setLoading(false);
        console.warn('[Flight Search] Missing required fields:', { originCode, destinationCode, departureDate, adults });
        return;
      }

      if (returnDate && new Date(returnDate) < new Date(departureDate)) {
        toast.error("Return date cannot be earlier than departure date.");
        setLoading(false);
        console.warn('[Flight Search] Invalid return date:', { departureDate, returnDate });
        return;
      }

      // Validate currency before making the API call
      const validatedCurrencyCode = validateCurrencyCode(currencyCode) ? currencyCode : DEFAULT_CURRENCY;

      // Log the data being sent to the backend
      const backendPayload = {
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate,
        returnDate,
        adults,
        children: validatedData.children,
        infants: validatedData.infants,
        max: max || 100,
        currencyCode: validatedCurrencyCode,
        travelClass,
        page: page || 1,
        limit: limit || 10
      };
      console.log('[Flight Search] Sending to backend:', backendPayload);

      // Build query parameters
      const queryParams = new URLSearchParams({
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate,
        adults,
        max: max || 100,
        currencyCode: validatedCurrencyCode,
        page: page || 1,
        limit: limit || 10
      });

      if (returnDate) queryParams.append("returnDate", returnDate);
      if (travelClass) queryParams.append("travelClass", travelClass);
      if (validatedData.children) queryParams.append("children", validatedData.children);
      if (validatedData.infants) queryParams.append("infants", validatedData.infants);

      console.log('[Flight Search] Final API URL:', `${API_URL}/api/user/flightOffers?${queryParams.toString()}`);

      const response = await axios.get(`${API_URL}/api/user/flightOffers?${queryParams.toString()}`);

      setFlightOffers(response.data.data);

      onSearch({ ...validatedData, tripType });

    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle Zod validation errors
        const errorMessages = err.errors.map(error => error.message).join(', ');
        toast.error(errorMessages);
        setError(errorMessages);
        console.error('[Flight Search] Zod validation error:', err.errors);
      } else {
        // Handle other errors as before
        const message = err.response?.data?.message || "Something went wrong while fetching flight offers";
        setError(message);
        console.error('[Flight Search] API error:', err);
      }
    } finally {
      setLoading(false);
    }
  }, [flightData, tripType, onSearch]);

  const travelerInputRef = useRef(null);
  const [travelerDropdownPosition, setTravelerDropdownPosition] = useState({ top: 0, left: 0, width: 320 });

  if (activeTab !== 'flights') return null;

  return (
    <div className="relative" style={{ zIndex: 50 }}>
      <form onSubmit={handleFlightSearch} className="p-4 space-y-6">
        {/* Trip Type and Currency Selection */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          {/* Trip Type Buttons */}
          <div className="flex space-x-2 sm:space-x-4 w-full sm:w-auto">
            {['oneway', 'roundtrip'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleTripTypeChange(type)}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md border ${
                  tripType === type 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {type === 'oneway' ? 'One Way' : 'Round Trip'}
              </button>
            ))}
          </div>

          {/* Currency Selector */}
          <div className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-3 py-2 border rounded-md hover:bg-gray-50"
            >
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span>{currentCurrency.code}</span>
            </button>

            {showCurrencyDropdown && (
              <div 
                className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto"
                style={{
                  top: '100%',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                }}
              >
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    type="button"
                    onClick={() => handleCurrencyChange(currency.code)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between ${
                      currency.code === flightData.currencyCode ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    <span className="flex items-center">
                      <span className="w-8">{currency.symbol}</span>
                      <span>{currency.code}</span>
                    </span>
                    <span className="text-sm text-gray-500">{currency.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* From Input */}
          <div className="relative">
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
              <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-60">
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

          {/* To Input */}
          <div className="relative">
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
              <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-60">
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
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                name="departureDate"
                value={flightData.departureDate}
                onChange={handleInputChange}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                required
                min={new Date().toISOString().split('T')[0]}
                pattern="\d{4}-\d{2}-\d{2}"
                title="Please enter a valid date in YYYY-MM-DD format"
              />
            </div>
          ) : (
            <>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="departureDate"
                  value={flightData.departureDate}
                  onChange={handleInputChange}
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  pattern="\d{4}-\d{2}-\d{2}"
                  title="Please enter a valid date in YYYY-MM-DD format"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="returnDate"
                  value={flightData.returnDate || ''}
                  onChange={handleInputChange}
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  required={tripType === 'roundtrip'}
                  min={flightData.departureDate || new Date().toISOString().split('T')[0]}
                  pattern="\d{4}-\d{2}-\d{2}"
                  title="Please enter a valid date in YYYY-MM-DD format"
                />
              </div>
            </>
          )}

          {/* Travelers */}
          <div className="relative col-span-full sm:col-span-1">
            <UserPlus className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <div
              ref={travelerInputRef}
              className="pl-10 pr-4 py-2 w-full border rounded-md focus-within:ring-2 focus-within:ring-blue-500 bg-white cursor-pointer"
              onClick={() => {
                if (!showTravelerDropdown) {
                  // Calculate position
                  const rect = travelerInputRef.current.getBoundingClientRect();
                  setTravelerDropdownPosition({
                    top: rect.bottom + window.scrollY,
                    left: rect.left + window.scrollX,
                    width: rect.width
                  });
                }
                setShowTravelerDropdown(!showTravelerDropdown);
              }}
            >
              {totalPassengers ? `${totalPassengers} Passenger${totalPassengers > 1 ? 's' : ''}` : 'Passengers'}
            </div>

            {showTravelerDropdown && (
              <TravelerDropdown
                flightData={flightData}
                handleInputChange={handleInputChange}
                onClose={() => setShowTravelerDropdown(false)}
                position={travelerDropdownPosition}
              />
            )}
          </div>

          {/* Travel Class Dropdown */}
          <div className="relative col-span-full sm:col-span-1 lg:col-span-1">
            <div className="relative">
              <Plane className="absolute left-3 top-3 h-5 w-5 text-gray-400 rotate-90" />
              <select
                name="travelClass"
                value={flightData.travelClass}
                onChange={handleInputChange}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="ECONOMY">Economy</option>
                <option value="PREMIUM_ECONOMY">Premium Economy</option>
                <option value="BUSINESS">Business</option>
                <option value="FIRST">First</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

        </div>

        {/* Additional Options */}
        <div className="flex flex-wrap gap-4">
          {/* <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={addPlace} 
              onChange={() => setAddPlace(!addPlace)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Add a place to stay</span>
          </label> */}

          {tripType === 'roundtrip' && (
            <label className="flex items-center space-x-2">
              {/* <input 
                type="checkbox" 
                checked={addCar} 
                onChange={() => setAddCar(!addCar)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Add a car</span> */}
            </label>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {/* Search Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md text-base sm:text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Searching...' : 'Search Flights'}
          </button>
        </div>
      </form>

      {/* Flight Results */}
      {flightOffers.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Available Flights</h2>
          <div className="space-y-4">
            {flightOffers.map((offer, index) => (
              <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                    <p className="font-bold text-lg">
                      {currentCurrency.symbol}{parseFloat(offer.price.total).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">{offer.travelerPricings.length} traveler(s)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setFlightData(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
              disabled={flightData.page === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-600">Page {flightData.page}</span>
            <button
              onClick={() => setFlightData(prev => ({ ...prev, page: prev.page + 1 }))}
              className="px-4 py-2 border rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

SearchForm.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  initialSearchParams: PropTypes.shape({
    originLocationCode: PropTypes.string,
    destinationLocationCode: PropTypes.string,
    departureDate: PropTypes.string,
    returnDate: PropTypes.string,
    adults: PropTypes.number,
    children: PropTypes.number,
    infants: PropTypes.number,
    max: PropTypes.number,
    currencyCode: PropTypes.string,
    travelClass: PropTypes.string
  })
};

export default SearchForm;