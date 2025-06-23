import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/deals', text: 'Destinations' },
    { to: '/contact', text: 'Contact' },
  ];

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <li key={link.to} className={isMobile ? '' : 'text-sm font-medium'}>
        <Link
          to={link.to}
          className="hover:text-blue-400 transition-colors"
          onClick={() => {
            if (isMobile) {
              setMobileMenuOpen(false);
            }
          }}
        >
          {link.text}
        </Link>
      </li>
    ));

  return (
    <header className="bg-[#0F172A] text-white py-4 relative z-20">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left side: Logo and Desktop Nav */}
        <div className="flex items-center space-x-8">
          <Logo />
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">{renderNavLinks()}</ul>
          </nav>
        </div>

        {/* Right side: Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A] absolute top-full left-0 w-full shadow-lg">
          <nav>
            <ul className="flex flex-col items-center space-y-4 py-4">
              {renderNavLinks(true)}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;