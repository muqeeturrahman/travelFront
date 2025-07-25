import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Navbar() {
  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/deals', text: 'Destinations' },
    { to: '/contact', text: 'Contact' },
    // { to: '/about', text: 'About Us' },
  ];

  return (
    <>
      {/* Top Contact Bar - Professional and Responsive */}
      <div className="w-full bg-[#23242a] text-white text-xs sm:text-sm py-2 flex justify-center items-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>
        <span>1, Clarence St, Strathfield, NSW 2135 Sydney, Australia</span>
      </div>
      {/* Main Navbar */}
      <header className="bg-[#0F172A] text-white py-2 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Logo />
            <nav>
              <ul className="flex items-center space-x-4 sm:space-x-6">
                {navLinks.map((link) => (
                  <li key={link.to} className="text-sm font-medium">
                    <Link
                      to={link.to}
                      className="hover:text-blue-400 transition-colors whitespace-nowrap"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;