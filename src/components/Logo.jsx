import React from 'react';

function Logo() {
  return (
    <a href="/" className="flex items-center">
    <img 
  src="/src/components/Flight on Budget logo-04.svg" 
  alt="Flight on Budget" 
  className="h-13 w-40"  // 👈 Increased width
  style={{ display: 'block' }}
/>

    </a>
  );
}

export default Logo;
