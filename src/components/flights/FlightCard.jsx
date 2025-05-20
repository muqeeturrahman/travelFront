import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Plane, Clock, Calendar, DollarSign, Users, Luggage, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import BookingModal from './BookingModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3008';

const FlightCard = ({ flightOffer, searchParams }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return {
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  };

  const formatDuration = (duration) => {
    const hours = duration.match(/(\d+)H/)?.[1] || '0';
    const minutes = duration.match(/(\d+)M/)?.[1] || '0';
    return `${hours}h ${minutes}m`;
  };

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
  const departure = formatDateTime(flightOffer.itineraries[0].segments[0].departure.at);
  const arrival = formatDateTime(flightOffer.itineraries[0].segments[flightOffer.itineraries[0].segments.length - 1].arrival.at);
  const duration = formatDuration(flightOffer.itineraries[0].duration);
  const stops = flightOffer.itineraries[0].segments.length - 1;

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Price Banner */}
        <div className="bg-blue-600 text-white px-6 py-3 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            <span className="text-2xl font-bold">${parseFloat(flightOffer.price.total).toFixed(2)}</span>
            <span className="ml-2 text-sm opacity-75">per person</span>
          </div>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            disabled={isLoading}
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors disabled:bg-gray-200 disabled:text-blue-400"
          >
            {isLoading ? 'Processing...' : 'Book Now'}
          </button>
        </div>

        <div className="p-6">
          {/* Flight Route */}
          <div className="flex items-center justify-between mb-6">
            {/* Departure */}
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{departure.time}</p>
              <p className="text-sm text-gray-500">{flightOffer.itineraries[0].segments[0].departure.iataCode}</p>
              <p className="text-xs text-gray-400">{departure.date}</p>
            </div>

            {/* Flight Duration */}
            <div className="flex-1 px-8">
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-500 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  {duration}
                </p>
                <div className="w-full flex items-center">
                  <div className="h-[2px] flex-1 bg-gray-300"></div>
                  <Plane className="h-5 w-5 text-blue-600 mx-2" />
                  <div className="h-[2px] flex-1 bg-gray-300"></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {stops === 0 ? 'Direct' : `${stops} Stop${stops > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>

            {/* Arrival */}
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{arrival.time}</p>
              <p className="text-sm text-gray-500">{flightOffer.itineraries[0].segments[flightOffer.itineraries[0].segments.length - 1].arrival.iataCode}</p>
              <p className="text-xs text-gray-400">{arrival.date}</p>
            </div>
          </div>

          {/* Flight Details */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-3 gap-4">
              {/* Airline */}
              <div className="flex items-center">
                <Luggage className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Airline</p>
                  <p className="text-sm text-gray-500">
                    {flightOffer.itineraries[0].segments[0].carrierCode} {flightOffer.itineraries[0].segments[0].number}
                  </p>
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

            {/* Segments/Stops Details */}
            {stops > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium text-gray-700 mb-2">Flight Segments:</p>
                {flightOffer.itineraries[0].segments.map((segment, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600 mb-2">
                    <span>{segment.departure.iataCode}</span>
                    <ArrowRight className="h-4 w-4 mx-2" />
                    <span>{segment.arrival.iataCode}</span>
                    <span className="ml-2">({formatDateTime(segment.departure.at).time})</span>
                  </div>
                ))}
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