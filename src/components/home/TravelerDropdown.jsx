import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const TravelerDropdown = ({ flightData, handleInputChange, onClose, position }) => {
  const dropdown = (
    <div
      className="bg-white border border-gray-300 rounded-md shadow-lg z-[9999] p-4 space-y-3"
      style={{
        position: 'absolute',
        top: position?.top || 0,
        left: position?.left || 0,
        width: position?.width || 320,
        minWidth: 240,
        maxWidth: 400,
      }}
    >
      {/* Adults */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700 font-medium">Adults</p>
          <p className="text-xs text-gray-500">&gt;12 years</p>
        </div>
        <input
          type="number"
          id="adults"
          name="adults"
          min={0}
          max={9}
          placeholder="0"
          value={flightData.adults === 0 ? '' : flightData.adults}
          onChange={handleInputChange}
          className="w-16 border rounded-md px-2 py-1 text-center"
        />
      </div>

      {/* Children */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700 font-medium">Children</p>
          <p className="text-xs text-gray-500">2–12 years</p>
        </div>
        <input
          type="number"
          id="children"
          name="children"
          min={0}
          max={9}
          placeholder="0"
          value={flightData.children === 0 ? '' : flightData.children}
          onChange={handleInputChange}
          className="w-16 border rounded-md px-2 py-1 text-center"
        />
      </div>

      {/* Infants */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700 font-medium">Infants</p>
          <p className="text-xs text-gray-500">&lt;2 years</p>
        </div>
        <input
          type="number"
          id="infants"
          name="infants"
          min={0}
          max={9}
          placeholder="0"
          value={flightData.infants === 0 ? '' : flightData.infants}
          onChange={handleInputChange}
          className="w-16 border rounded-md px-2 py-1 text-center"
        />
      </div>

      {/* Travel Class */}
      <div className="pt-3 border-t border-gray-200">
        <p className="text-gray-700 font-medium mb-2">Travel Class</p>
        <div className="space-y-2">
          {['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'].map((travelClass) => (
            <label key={travelClass} className="flex items-center space-x-2">
              <input 
                type="radio" 
                name="travelClass" 
                value={travelClass} 
                checked={flightData.travelClass === travelClass} 
                onChange={handleInputChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{travelClass.split('_').map(word => 
                word.charAt(0) + word.slice(1).toLowerCase()
              ).join(' ')}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-full mt-4 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors"
      >
        Done
      </button>
    </div>
  );
  return ReactDOM.createPortal(dropdown, document.body);
};

TravelerDropdown.propTypes = {
  flightData: PropTypes.shape({
    adults: PropTypes.number,
    children: PropTypes.number,
    infants: PropTypes.number,
    travelClass: PropTypes.string
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  position: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number
  })
};

export default TravelerDropdown; 