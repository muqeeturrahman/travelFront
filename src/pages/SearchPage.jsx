import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import SearchForm from '../components/home/SearchForm';
import FilterSidebar from '../components/search/FilterSidebar';
import FlightCard from '../components/flights/FlightCard';
import Footer from '../components/home/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'https://travey-backend.vercel.app';

function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flightOffers, setFlightOffers] = useState([]);
  const [searchParams, setSearchParams] = useState(location.state?.searchParams || null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [flightDiscount, setFlightDiscount] = useState(0);
  
  // Add filter state
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    minPrice: 0,
    maxPrice: 10000,
    stops: [],
    duration: [0, 48],
    minDuration: 0,
    maxDuration: 48,
    airlines: [],
    availableAirlines: [],
    travelClass: searchParams?.travelClass || 'ECONOMY'
  });

  // Function to extract duration in hours from flight duration string
  const extractDurationHours = (duration) => {
    const hours = duration.match(/(\d+)H/)?.[1] || '0';
    const minutes = duration.match(/(\d+)M/)?.[1] || '0';
    return parseInt(hours) + (parseInt(minutes) / 60);
  };

  // Function to apply filters to flight offers
  const applyFilters = (offers) => {
    return offers.filter(offer => {
      const price = parseFloat(offer.price.total);
      const durationHours = extractDurationHours(offer.itineraries[0].duration);
      const stops = offer.itineraries[0].segments.length - 1;
      const airline = offer.itineraries[0].segments[0].carrierCode;

      // Price filter
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;

      // Stops filter
      if (filters.stops.length > 0 && !filters.stops.includes(Math.min(stops, 2))) return false;

      // Duration filter
      if (durationHours < filters.duration[0] || durationHours > filters.duration[1]) return false;

      // Airlines filter
      if (filters.airlines.length > 0 && !filters.airlines.includes(airline)) return false;

      // Travel class filter
      if (filters.travelClass && offer.travelerPricings[0].fareDetailsBySegment[0].cabin !== filters.travelClass) return false;

      return true;
    });
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'reset') {
      setFilters(prev => ({
        ...prev,
        priceRange: [prev.minPrice, prev.maxPrice],
        stops: [],
        duration: [prev.minDuration, prev.maxDuration],
        airlines: [],
        travelClass: searchParams?.travelClass || 'ECONOMY'
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  // Debug function to log state changes
  const debugLog = (label, data) => {
    console.log(`[DEBUG] ${label}:`, data);
  };

  const extractAirportCode = (input) => {
    const match = input.match(/\(([A-Z]{3})\)/);
    return match ? match[1] : input;
  };

  const fetchFlights = useCallback(async (params) => {
    setLoading(true);
    setError(null);

    try {
      const {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        adults,
        max,
        currencyCode,
        travelClass,
        children,
        infants,
        tripType
      } = params;

      debugLog('Search Parameters', params);

      const originCode = extractAirportCode(originLocationCode);
      const destinationCode = extractAirportCode(destinationLocationCode);

      if (!originCode || !destinationCode || !departureDate || !adults || !currencyCode) {
        toast.error("Please fill all required fields.");
        return;
      }

      if (returnDate && new Date(returnDate) < new Date(departureDate)) {
        toast.error("Return date cannot be earlier than departure date.");
        return;
      }

      const queryParams = new URLSearchParams({
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate,
        adults,
        max: max || 100,
        currencyCode,
        page: pagination.page,
        limit: pagination.limit
      });

      if (returnDate) queryParams.append("returnDate", returnDate);
      if (travelClass) queryParams.append("travelClass", travelClass);
      if (children) queryParams.append("children", children);
      if (infants) queryParams.append("infants", infants);

      debugLog('API Request URL', `${API_URL}/api/user/flightOffers?${queryParams.toString()}`);

      const response = await axios.get(`${API_URL}/api/user/flightOffers?${queryParams.toString()}`);

      debugLog('API Response', response.data);

      // Extract data and meta from response
      const responseData = response.data.data;
      const flights = responseData.data || [];
      const meta = response.data.meta || {};
      const discount = responseData.flightDiscount || 0;

      // Update available airlines and price range
      const airlines = [...new Set(flights.flatMap(offer => 
        offer.itineraries[0].segments.map(segment => segment.carrierCode)
      ))];
      
      const prices = flights.map(offer => parseFloat(offer.price.total));
      const durations = flights.map(offer => extractDurationHours(offer.itineraries[0].duration));

      setFilters(prev => ({
        ...prev,
        availableAirlines: airlines,
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices),
        priceRange: [Math.min(...prices), Math.max(...prices)],
        minDuration: Math.min(...durations),
        maxDuration: Math.max(...durations),
        duration: [Math.min(...durations), Math.max(...durations)],
        travelClass: params.travelClass || prev.travelClass
      }));

      debugLog('Flights Data', flights);
      debugLog('Meta Data', meta);
      debugLog('Flight Discount', discount);

      // Calculate total pages using meta data from backend
      const totalItems = meta.total || flights.length;
      const totalPages = meta.totalPages || Math.ceil(totalItems / pagination.limit);

      setFlightOffers(flights);
      setFlightDiscount(discount);
      setPagination(prev => ({
        ...prev,
        total: totalItems,
        totalPages: totalPages
      }));
      setSearchParams(params);

    } catch (err) {
      debugLog('Error', err);
      const message = err.response?.data?.message || "Something went wrong while fetching flight offers";
      setError(message);
      toast.error(message);
      console.error("Flight search error:", err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  const handleSearch = useCallback((params) => {
    debugLog('New Search', params);
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchFlights(params);
  }, [fetchFlights]);

  const handlePageChange = useCallback((newPage) => {
    debugLog('Page Change', { from: pagination.page, to: newPage });
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  }, [pagination.page, pagination.totalPages]);

  useEffect(() => {
    if (searchParams) {
      debugLog('Effect Triggered', { searchParams, currentPage: pagination.page });
      fetchFlights(searchParams);
    }
  }, [pagination.page, fetchFlights, searchParams]);

  // Get filtered flight offers
  const filteredFlightOffers = applyFilters(flightOffers);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      {/* Search Form */}
      <div className="bg-blue-900 py-6">
        <div className="container mx-auto px-4">
          <SearchForm
            activeTab="flights"
            initialSearchParams={searchParams}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4 w-full">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 w-full">
            {/* Results Summary */}
            {filteredFlightOffers?.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {pagination.total} flights found
                </h2>
                {flightDiscount > 0 && (
                  <p className="text-green-600 mt-2">
                    Special offer: {flightDiscount}% discount available!
                  </p>
                )}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Flight Cards */}
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">Loading flights...</p>
                </div>
              ) : filteredFlightOffers?.length > 0 ? (
                <>
                  {filteredFlightOffers.map((offer, index) => (
                    <FlightCard
                      key={index}
                      flightOffer={offer}
                      searchParams={searchParams}
                      discount={flightDiscount}
                    />
                  ))}
                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-lg shadow-sm">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                          let pageNum;
                          if (pagination.totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (pagination.page <= 3) {
                            pageNum = i + 1;
                          } else if (pagination.page >= pagination.totalPages - 2) {
                            pageNum = pagination.totalPages - 4 + i;
                          } else {
                            pageNum = pagination.page - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-3 py-1 rounded-md ${
                                pagination.page === pageNum
                                  ? 'bg-blue-600 text-white'
                                  : 'border hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages}
                        className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">No flight offers found matching your criteria. Try adjusting your filters or search for different dates.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SearchPage;
