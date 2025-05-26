import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming API constants and token fetching logic are available or imported
// For now, I will duplicate the relevant parts from FlightCard.jsx
const AMADEUS_API_URL = 'https://test.api.amadeus.com/v1';
// Using placeholder keys, replace with actual secure handling in a real application
const AMADEUS_CLIENT_ID = 'OqEvtfnNdGtWZ73gmqX3Nosbmc8DfHtG';
const AMADEUS_CLIENT_SECRET = 'fQ8gSfbPh0v9usjP';

const tokenCache = {
  token: null,
  expiresAt: null
};

const getAmadeusToken = async () => {
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
    tokenCache.token = response.data.access_token;
    tokenCache.expiresAt = Date.now() + (response.data.expires_in * 1000);
    return tokenCache.token;
  } catch (error) {
    console.error('Error fetching Amadeus token:', error);
    return null;
  }
};

function PopularFlights() {
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularRoutes = async () => {
      try {
        setLoading(true);
        const token = await getAmadeusToken();
        if (!token) {
          setError('Could not obtain Amadeus access token.');
          setLoading(false);
          return;
        }

        // Using a default origin and period as in the example API call
        const originCityCode = 'MAD'; // Madrid
        const period = '2019-11';
        const maxResults = 10;

        const response = await axios.get(
          `${AMADEUS_API_URL}/travel/analytics/air-traffic/traveled?originCityCode=${originCityCode}&period=${period}&sort=analytics.travelers.score&max=${maxResults}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.data && response.data.data) {
          setPopularRoutes(response.data.data);
        } else {
          setPopularRoutes([]);
        }
        setLoading(false);

      } catch (err) {
        console.error('Error fetching popular routes:', err);
        setError('Failed to load popular routes.');
        setLoading(false);
      }
    };

    fetchPopularRoutes();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading popular flights...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (popularRoutes.length === 0) {
    return <div className="text-center py-8 text-gray-500">No popular routes found for this period.</div>;
  }

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Flight Routes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-600">From MAD to {route.destination.iataCode}</h3>
              <p className="text-sm text-gray-600">Travelers Score: {route.analytics.travelers.score.toFixed(2)}</p>
              {/* Add more details here if needed */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularFlights; 