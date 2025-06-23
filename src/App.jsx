import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import FlightsPage from './pages/FlightsPage';
import HotelListingCard from './components/search/HotelListingCard';
import ConfirmationPage from './pages/ConfirmationPage';
import ContactPage from './pages/ContactPage';
import DealsPage from './pages/DealsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  React.useEffect(() => {
    // Check if we're returning from payment
    const shouldReturnHome = localStorage.getItem('returnToHome');
    if (shouldReturnHome) {
      // Clear the flag
      localStorage.removeItem('returnToHome');
      // Navigate to confirmation page instead of home
      window.location.href = '/confirmation';
    }
  }, []);

  return (
    <Router>
         <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={1}
          toastStyle={{
            backgroundColor: 'white',
            color: 'black',
          }}
        />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/hotel" element={<HotelListingCard />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/deals" element={<DealsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
