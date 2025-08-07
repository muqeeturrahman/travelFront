import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', text: 'HOME' },
    { to: '/about', text: 'ABOUT US' },
    { to: '/deals', text: 'DESTINATIONS' },
    // { to: '/payment', text: 'Payment' },
    { to: '/contact', text: 'CONTACT US' },
    // <Route path="/make-payment" element={<CustomPayPage />} />
    { to: '/custom-package', text: 'CUSTOM PACKAGE' },

    { to: '/terms', text: 'TERMS & CONDITIONS' },
    { to: '/faq', text: 'FREQUENTLY ASKED QUESTIONS' },

    // { to: '/support', text: 'Help & Support' },
    // { to: '/blogs', text: 'Blogs' },
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <div className="w-full bg-[#23242a] text-white text-xs sm:text-sm py-2 flex justify-center items-center">
        {/* <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
        </svg> */}
        <span>This is an independent website with no ties to any other entity.</span>
      </div>

      {/* Main Navbar */}
      <header className="bg-white text-black shadow-sm border-b border-gray-200 py-2 relative z-50">
        <div className="container mx-auto px-4">
          {/* Flex Row for Logo + Links + Hamburger */}
          <div className="flex items-center justify-between relative md:justify-start">

            {/* Logo + Nav (grouped on desktop) */}
            <div className="flex items-center space-x-6">
              <Logo />
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6 ml-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm font-medium hover:text-blue-500 transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
                {/* <Link
                  to="/book"
                  className="ml-4 px-5 py-2 rounded-md bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors"
                >
                  BOOK NOW
                </Link> */}
              </nav>
            </div>

            {/* Mobile Hamburger Icon */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-[9998] transition-opacity duration-300" 
              onClick={() => setIsOpen(false)} 
            />
            
            {/* Drawer with animation */}
            <div
              className="fixed top-0 left-0 h-full w-[280px] max-w-[85vw] bg-white z-[9999] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out"
              style={{ 
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                animation: 'slideInFromLeft 0.3s cubic-bezier(0.4,0,0.2,1)' 
              }}
              role="dialog"
              aria-modal="true"
            >
              {/* Header with Logo and Close Button */}
              <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex-1">
                  <Logo />
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors" 
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                <nav className="py-4">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-6 py-4 text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-base font-medium">{link.text}</span>
                      <svg className="ml-auto w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </nav>

                {/* Book Now Button - uncomment if needed */}
                {/* <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <Link
                    to="/book"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
                  >
                    BOOK NOW
                  </Link>
                </div> */}
              </div>
            </div>

            {/* Animation Keyframes */}
            <style>{`
              @keyframes slideInFromLeft {
                from { 
                  transform: translateX(-100%); 
                  opacity: 0;
                }
                to { 
                  transform: translateX(0); 
                  opacity: 1;
                }
              }
            `}</style>
          </>
        )}
      </header>
    </>
  );
}

export default Navbar;