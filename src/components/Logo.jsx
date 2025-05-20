import React from 'react';
import { Navigation } from 'lucide-react';

function Logo() {
  return (
    <a href="/" className="flex items-center space-x-2">
      <div className="bg-white rounded-full p-2">
        <Navigation className="h-5 w-5 text-blue-600" />
      </div>
      <span className="font-bold text-xl text-white">GoTrip</span>
    </a>
  );
}

export default Logo;