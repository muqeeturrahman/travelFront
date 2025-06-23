import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Navbar() {
  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/deals', text: 'Destinations' },
    { to: '/contact', text: 'Contact' },
  ];

  return (
    <header className="bg-[#0F172A] text-white py-4">
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
  );
}

export default Navbar;