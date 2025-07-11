// src/components/flights/BookingModal.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Select from 'react-select';

// Country list for Nationality dropdown
const countryList = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", 'Eswatini (fmr. "Swaziland")', "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

const BookingModal = ({ isOpen, onClose, onSubmit, flightData }) => {
  const [bookingDetails, setBookingDetails] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    passportNumber: '',
    seatPreference: '',
    mealPreference: '',
    extraBaggageAddOns: 0
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!bookingDetails.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!bookingDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(bookingDetails.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!bookingDetails.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!isValidPhoneNumber(bookingDetails.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!bookingDetails.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    if (!bookingDetails.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!bookingDetails.nationality.trim()) {
      newErrors.nationality = 'Nationality is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(bookingDetails);
    }
  };

  if (!isOpen) return null;

  const countryOptions = countryList.map(country => ({ value: country, label: country }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-2xl border w-11/12 max-w-md sm:max-w-lg md:max-w-xl relative flex flex-col max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4 pt-2 px-2 sm:px-4">Complete Your Booking</h2>
        <div className="overflow-y-auto px-2 sm:px-4 pb-4 pt-0" style={{ maxHeight: '70vh' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={bookingDetails.fullName}
                onChange={(e) => setBookingDetails(prev => ({
                  ...prev,
                  fullName: e.target.value
                }))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={bookingDetails.email}
                onChange={(e) => setBookingDetails(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className={`phone-input-container ${errors.phoneNumber ? 'has-error' : ''}`}>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="US"
                  value={bookingDetails.phoneNumber}
                  onChange={(value) => {
                    setBookingDetails(prev => ({
                      ...prev,
                      phoneNumber: value || ''
                    }));
                    if (errors.phoneNumber) {
                      setErrors(prev => ({
                        ...prev,
                        phoneNumber: undefined
                      }));
                    }
                  }}
                  className="w-full"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={bookingDetails.dateOfBirth}
                onChange={e => setBookingDetails(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={bookingDetails.gender}
                onChange={e => setBookingDetails(prev => ({ ...prev, gender: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nationality
              </label>
              <Select
                options={countryOptions}
                value={countryOptions.find(option => option.value === bookingDetails.nationality) || null}
                onChange={option => setBookingDetails(prev => ({ ...prev, nationality: option ? option.value : '' }))}
                placeholder="Select your nationality"
                classNamePrefix="react-select"
                className={errors.nationality ? 'border-red-500' : ''}
                isClearable
              />
              {errors.nationality && (
                <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passport Number
              </label>
              <input
                type="text"
                value={bookingDetails.passportNumber}
                onChange={e => setBookingDetails(prev => ({ ...prev, passportNumber: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.passportNumber ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your passport number"
              />
              {errors.passportNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.passportNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seat Preference
              </label>
              <select
                value={bookingDetails.seatPreference}
                onChange={e => setBookingDetails(prev => ({ ...prev, seatPreference: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">No Preference</option>
                <option value="Window">Window</option>
                <option value="Aisle">Aisle</option>
                <option value="Middle">Middle</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meal Preference
              </label>
              <select
                value={bookingDetails.mealPreference}
                onChange={e => setBookingDetails(prev => ({ ...prev, mealPreference: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">No Preference</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Halal">Halal</option>
                <option value="No Meal">No Meal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Extra Baggage Add-Ons
              </label>
              <select
                value={bookingDetails.extraBaggageAddOns}
                onChange={e => setBookingDetails(prev => ({ ...prev, extraBaggageAddOns: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">No extra baggage</option>
                <option value="10kg">Add 10kg ($30)</option>
                <option value="20kg">Add 20kg ($60)</option>
                <option value="30kg">Add 30kg ($90)</option>
              </select>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <a
                href="https://wa.me/61480810519"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 text-center"
              >
                Book on WhatsApp
              </a>
              <a
                href="tel:+61480810519"
                className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-center"
              >
                Call to Book
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

BookingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  flightData: PropTypes.object.isRequired
};

export default BookingModal;