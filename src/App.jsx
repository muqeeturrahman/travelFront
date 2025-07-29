import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SearchPage from './pages/SearchPage';
import FlightsPage from './pages/FlightsPage';
import HotelListingCard from './components/search/HotelListingCard';
import ConfirmationPage from './pages/ConfirmationPage';
import ContactPage from './pages/ContactPage';
import DealsPage from './pages/DealsPage';
import LeadsPage from './pages/LeadsPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import CheckoutCancelPage from './pages/CheckoutCancelPage';
import TermsPage from './pages/TermsPage';
import FAQPage from './pages/FAQPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function sendPageView(path) {
  // Google Tag Manager
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'pageview',
      page: path,
    });
  }
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  }
  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
}

// Tracks route changes for analytics
function RouteChangeTracker() {
  const location = useLocation();
  React.useEffect(() => {
    sendPageView(location.pathname);
  }, [location]);
  return null;
}

function App() {
  React.useEffect(() => {
    // Check if we're returning from payment
    const shouldReturnHome = localStorage.getItem('returnToHome');
    if (shouldReturnHome) {
      localStorage.removeItem('returnToHome');
      window.location.href = '/confirmation';
    }
  }, []);

  return (
    <Router>
      <RouteChangeTracker />
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
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
          <Route path="/checkout-cancel" element={<CheckoutCancelPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
