import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Plane, Clock, Calendar, DollarSign, Users, Luggage, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import BookingModal from './BookingModal';
import { DateTime } from 'luxon';

const API_URL = import.meta.env.VITE_API_URL || 'https://travey-backend.vercel.app';
const AMADEUS_API_URL = 'https://test.api.amadeus.com/v1';
const AMADEUS_CLIENT_ID = 'OqEvtfnNdGtWZ73gmqX3Nosbmc8DfHtG';
const AMADEUS_CLIENT_SECRET = 'fQ8gSfbPh0v9usjP';

// Cache for airline details
const airlineCache = new Map();
const tokenCache = {
  token: null,
  expiresAt: null
};

// Function to get Amadeus access token
const getAmadeusToken = async () => {
  // Check if we have a valid cached token
  if (tokenCache.token && tokenCache.expiresAt > Date.now()) {
    return tokenCache.token;
  }

  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: AMADEUS_CLIENT_ID,
        client_secret: AMADEUS_CLIENT_SECRET
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    // Cache the token
    tokenCache.token = response.data.access_token;
    tokenCache.expiresAt = Date.now() + (response.data.expires_in * 1000);
    
    return tokenCache.token;
  } catch (error) {
    console.error('Error fetching Amadeus token:', error);
    return null;
  }
};

// Function to fetch airline details from Amadeus API
const fetchAirlineDetails = async (carrierCode) => {
  try {
    const token = await getAmadeusToken();
    if (!token) return null;

    const response = await axios.get(
      `${AMADEUS_API_URL}/reference-data/airlines?airlineCodes=${carrierCode}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (response.data.data && response.data.data.length > 0) {
      return response.data.data[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching airline details:', error);
    return null;
  }
};

// Utility function to get airline details
const getAirlineDetails = async (carrierCode) => {
  // Check cache first
  if (airlineCache.has(carrierCode)) {
    return airlineCache.get(carrierCode);
  }

  const airlineData = await fetchAirlineDetails(carrierCode);

  // Use carrierCode if airlineData is null or if the business name is 'AMADEUS SIX'
  const resolvedName = (airlineData?.businessName && airlineData.businessName !== 'AMADEUS SIX')
                         ? airlineData.businessName
                         : carrierCode;

  const details = {
    name: resolvedName,
    logo: `https://content.airhex.com/content/logos/airlines_${carrierCode}_350_100_r.png?proportions=keep`
  };

  // Cache the result
  airlineCache.set(carrierCode, details);
  return details;
};

// Utility function to format date and time in user's local timezone
const formatDateTimeInUserZone = (dateTimeStr) => {
  try {
    // Parse the API time as UTC
    const dtUTC = DateTime.fromISO(dateTimeStr, { zone: 'utc' });
    if (!dtUTC.isValid) {
      console.error('Invalid date string from API:', dateTimeStr);
      return { time: 'N/A', date: 'N/A' };
    }

    // Get user's local timezone
    const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Convert to user's local timezone
    const dtLocal = dtUTC.setZone(userZone);

    return {
      time: dtLocal.toFormat('hh:mm a'), // e.g., 03:00 PM
      date: dtLocal.toFormat('MMM d, yyyy') // e.g., Jan 1, 2024
    };
  } catch (error) {
    console.error('Error formatting date/time:', dateTimeStr, error);
    return { time: 'Error', date: 'Error' };
  }
};

// Utility function to calculate duration between two UTC timestamps
const calculateDuration = (departureTimeUTC, arrivalTimeUTC) => {
  try {
    const departureUTC = DateTime.fromISO(departureTimeUTC, { zone: 'utc' });
    const arrivalUTC = DateTime.fromISO(arrivalTimeUTC, { zone: 'utc' });

    if (!departureUTC.isValid || !arrivalUTC.isValid) {
      console.error('Invalid date strings for duration calculation:', departureTimeUTC, arrivalTimeUTC);
      return 'N/A';
    }

    const diff = arrivalUTC.diff(departureUTC, ['hours', 'minutes']);
    const duration = diff.toObject();

    const hours = Math.floor(duration.hours) || 0;
    const minutes = Math.floor(duration.minutes) || 0;

    return `${hours}h ${minutes}m`;
  } catch (error) {
    console.error('Error calculating duration:', departureTimeUTC, arrivalTimeUTC, error);
    return 'Error';
  }
};

const FlightCard = ({ flightOffer, searchParams }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [airlineDetails, setAirlineDetails] = useState({});
  const [segmentAirlineDetails, setSegmentAirlineDetails] = useState({});

  useEffect(() => {
    const loadAirlineDetails = async () => {
      // Load main airline details (for the first segment)
      const mainCarrierCode = flightOffer.itineraries[0].segments[0].carrierCode;
      const mainDetails = await getAirlineDetails(mainCarrierCode);
      setAirlineDetails(mainDetails);

      // Load airline details for all unique carriers in segments
      const uniqueCarrierCodes = [...new Set(flightOffer.itineraries[0].segments.map(segment => segment.carrierCode))];
      const segmentDetailsPromises = uniqueCarrierCodes.map(code => getAirlineDetails(code));
      const segmentDetailsResults = await Promise.all(segmentDetailsPromises);

      const detailsMap = {};
      uniqueCarrierCodes.forEach((code, index) => {
        detailsMap[code] = segmentDetailsResults[index];
      });
      setSegmentAirlineDetails(detailsMap);
    };

    loadAirlineDetails();
  }, [flightOffer]);

  const handleBooking = async (userDetails) => {
    setIsLoading(true);
    try {
      // Get first and last segments for departure
      const firstSegment = flightOffer.itineraries[0].segments[0];
      const lastSegment = flightOffer.itineraries[0].segments[flightOffer.itineraries[0].segments.length - 1];

      // Prepare booking data
      const bookingData = {
        // Flight route details
        from: firstSegment.departure.iataCode,
        to: lastSegment.arrival.iataCode,
        price: parseFloat(flightOffer.price.total),
        date: firstSegment.departure.at,
        time: firstSegment.departure.at,
        duration: flightOffer.itineraries[0].duration,
        stops: flightOffer.itineraries[0].segments.length - 1,
        
        // Travel class and baggage
        travelClass: searchParams.travelClass || 'ECONOMY',
        checkedBags: 2,
        cabinBags: 1,
        
        // Passenger details
        adults: searchParams.adults || 1,
        children: searchParams.children || 0,
        infants: searchParams.infants || 0,
        
        // Trip dates
        departureDate: firstSegment.departure.at,
        returnDate: searchParams.tripType === 'roundtrip' ? flightOffer.itineraries[1]?.segments[0].departure.at : null,
        
        // Airlines
        departureAirline: firstSegment.carrierCode,
        returnAirline: searchParams.tripType === 'roundtrip' ? flightOffer.itineraries[1]?.segments[0].carrierCode : null,
        
        // User details
        ...userDetails
      };

      const response = await axios.post(`${API_URL}/api/user/bookFlight`, bookingData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success('Flight booked successfully! Redirecting to payment...');
        setIsBookingModalOpen(false);
        // Redirect to payment URL after a short delay
        setTimeout(() => {
          window.location.href = response.data.data.payment_url;
        }, 1500);
      } else {
        toast.error(response.data.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during booking');
      console.error('Booking error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get departure and arrival details
  const firstSegment = flightOffer.itineraries[0].segments[0];
  const lastSegment = flightOffer.itineraries[0].segments[flightOffer.itineraries[0].segments.length - 1];

  // Format departure and arrival times for display in user's local timezone
  const departureDisplay = formatDateTimeInUserZone(firstSegment.departure.at);
  const arrivalDisplay = formatDateTimeInUserZone(lastSegment.arrival.at);

  // Calculate duration using UTC times
  const calculatedDuration = calculateDuration(firstSegment.departure.at, lastSegment.arrival.at);

  const stops = flightOffer.itineraries[0].segments.length - 1;

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Price Banner */}
        <div className="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-t-lg flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            <span className="text-xl sm:text-2xl font-bold">{parseFloat(flightOffer.price.total).toFixed(2)}</span>
            <span className="ml-2 text-sm opacity-75">per person</span>
          </div>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            disabled={isLoading}
            className="bg-white text-blue-600 px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors disabled:bg-gray-200 disabled:text-blue-400 mt-2 sm:mt-0"
          >
            {isLoading ? 'Processing...' : 'Book Now'}
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Flight Route */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
            {/* Departure */}
            <div className="text-center w-full sm:w-auto">
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{departureDisplay.time}</p>
              <p className="text-sm text-gray-500">{firstSegment.departure.iataCode}</p>
              <p className="text-xs text-gray-400">{departureDisplay.date}</p>
            </div>

            {/* Flight Duration */}
            <div className="flex-1 px-2 sm:px-8 w-full">
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-500 mb-2 whitespace-nowrap">
                  <Clock className="inline h-4 w-4 mr-1" />
                  {calculatedDuration}
                </p>
                <div className="w-full flex items-center">
                  <div className="h-[2px] flex-1 bg-gray-300"></div>
                  <Plane className="h-5 w-5 text-blue-600 mx-2" />
                  <div className="h-[2px] flex-1 bg-gray-300"></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {stops === 0 ? 'Direct' : `${stops} Stop${stops > 1 ? 's' : ''}`}
                </p>
                <p className="text-sm font-medium text-blue-600 truncate max-w-full">
                  {airlineDetails.name || flightOffer.itineraries[0].segments[0].carrierCode}
                </p>
              </div>
            </div>

            {/* Arrival */}
            <div className="text-center w-full sm:w-auto">
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{arrivalDisplay.time}</p>
              <p className="text-sm text-gray-500">{lastSegment.arrival.iataCode}</p>
              <p className="text-xs text-gray-400">{arrivalDisplay.date}</p>
            </div>
          </div>

          {/* Flight Details */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Airline */}
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <img 
                    src={airlineDetails.logo}
                    alt={airlineDetails.name}
                    className="h-6 w-auto object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/100x30?text=Airline';
                    }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Airline</p>
                    <p className="text-sm font-medium text-blue-600 truncate max-w-[120px]">
                      {airlineDetails.name || flightOffer.itineraries[0].segments[0].carrierCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Passengers */}
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Passengers</p>
                  <p className="text-sm text-gray-500">
                    {flightOffer.numberOfBookableSeats} available
                  </p>
                </div>
              </div>

              {/* Class */}
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Class</p>
                  <p className="text-sm text-gray-500">{searchParams?.travelClass || 'Economy'}</p>
                </div>
              </div>
            </div>

            {/* Flight Segments */}
            {stops > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium text-gray-700 mb-2">Flight Segments:</p>
                {flightOffer.itineraries[0].segments.map((segment, index) => {
                  const segmentCarrierCode = segment.carrierCode;
                  const currentSegmentAirline = segmentAirlineDetails[segmentCarrierCode] || { name: segmentCarrierCode, logo: '' };

                  return (
                    <div key={index} className="flex flex-wrap items-center text-sm text-gray-600 mb-2">
                      <img
                        src={currentSegmentAirline.logo}
                        alt={currentSegmentAirline.name}
                        className="h-4 w-auto object-contain mr-2"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/100x30?text=Airline';
                        }}
                      />
                      <span className="mr-1">{segment.departure.iataCode}</span>
                      <ArrowRight className="h-4 w-4 mx-1" />
                      <span>{segment.arrival.iataCode}</span>
                      <span className="ml-2 whitespace-nowrap">({formatDateTimeInUserZone(segment.departure.at).time})</span>
                      <span className="ml-2 font-medium text-blue-600 truncate max-w-[150px] block sm:inline-block w-full sm:w-auto mt-1 sm:mt-0">
                        {currentSegmentAirline.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSubmit={handleBooking}
        flightData={flightOffer}
      />
    </>
  );
};

FlightCard.propTypes = {
  flightOffer: PropTypes.object.isRequired,
  searchParams: PropTypes.object.isRequired
};

export default FlightCard;