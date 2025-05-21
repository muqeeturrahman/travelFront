import React from 'react';
import { Globe, User, ChevronDown, Search } from 'lucide-react';
import Logo from './Logo';

function Navbar() {
  return (
    <header className="bg-[#0F172A] text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Logo />
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              <li className="text-sm font-medium"><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li className="text-sm font-medium">
                <a href="#" className="flex items-center hover:text-blue-400 transition-colors">
                  Categories <ChevronDown className="ml-1 h-4 w-4" />
                </a>
              </li>
              <li className="text-sm font-medium">
                <a href="#" className="flex items-center hover:text-blue-400 transition-colors">
                  Destinations <ChevronDown className="ml-1 h-4 w-4" />
                </a>
              </li>
              {/* <li className="text-sm font-medium"><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li> */}
              {/* <li className="text-sm font-medium">
                <a href="#" className="flex items-center hover:text-blue-400 transition-colors">
                  Pages <ChevronDown className="ml-1 h-4 w-4" />
                </a>
              </li> */}
              <li className="text-sm font-medium"><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center mr-4">
            {/* <div className="flex items-center mr-6">
              <Globe className="h-4 w-4 mr-1" />
              <span className="text-sm">AUD</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </div> */}
            {/* <div className="flex items-center mr-6">
              <Globe className="h-4 w-4 mr-1" />
              <span className="text-sm">English</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </div> */}
          </div>
          {/* <button className="hidden sm:flex items-center bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-blue-600">
            Become An Expert
          </button> */}
          {/* <button className="flex items-center bg-white text-[#0F172A] px-4 py-2 rounded-md text-sm font-medium">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Sign In / Register</span>
            <span className="sm:hidden">Sign In</span>
          </button> */}
          <button className="md:hidden">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;