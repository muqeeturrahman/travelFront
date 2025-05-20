import React from 'react';
import PropTypes from 'prop-types';

function DestinationCard({ name, imageUrl, properties }) {
  return (
    <a 
      href="#" 
      className="relative block h-[200px] rounded-lg overflow-hidden group"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-gray-300">{properties} properties</p>
      </div>
    </a>
  );
}

DestinationCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  properties: PropTypes.number.isRequired,
};

export default DestinationCard;