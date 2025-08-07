import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  User, 
  Calendar, 
  MapPin, 
  Plane, 
  Hotel, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Globe,
  Phone,
  Mail,
  Clock,
  Shield,
  Star
} from 'lucide-react';

function TravelBookingPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    passportNumber: '',
    passportExpiry: '',
    nationality: '',
    whatsappNumber: '',
    email: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adultsCount: '',
    childrenCount: '',
    infantsCount: '',
    packageType: '',
    hotelType: '',
    roomType: '',
    specialNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.passportNumber.trim()) newErrors.passportNumber = 'Passport number is required';
    if (!formData.passportExpiry) newErrors.passportExpiry = 'Passport expiry date is required';
    if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';
    if (!formData.whatsappNumber.trim()) newErrors.whatsappNumber = 'WhatsApp number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
    if (!formData.returnDate) newErrors.returnDate = 'Return date is required';
    if (!formData.adultsCount) newErrors.adultsCount = 'Number of adults is required';
    if (!formData.packageType) newErrors.packageType = 'Package type is required';

    // Date validations
    if (formData.departureDate && formData.returnDate) {
      if (new Date(formData.departureDate) >= new Date(formData.returnDate)) {
        newErrors.returnDate = 'Return date must be after departure date';
      }
    }

    // Passport expiry validation
    if (formData.passportExpiry) {
      const expiryDate = new Date(formData.passportExpiry);
      const today = new Date();
      if (expiryDate <= today) {
        newErrors.passportExpiry = 'Passport must be valid (not expired)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Submit the form programmatically
    const form = e.target;
    form.submit();
  };

  const packageTypes = [
    'All Inclusive',
    'Half Board',
    'Bed & Breakfast',
    'Self Catering',
    'Flight Only',
    'Flight + Hotel',
    'Custom Package'
  ];

  const hotelTypes = [
    'Budget (2-3 Stars)',
    'Standard (3-4 Stars)',
    'Premium (4-5 Stars)',
    'Luxury (5 Stars)',
    'Resort',
    'Boutique Hotel',
    'Apartment/Villa'
  ];

  const roomTypes = [
    'Standard Room',
    'Deluxe Room',
    'Suite',
    'Family Room',
    'Connecting Rooms',
    'Ocean View',
    'Garden View',
    'Mountain View'
  ];

  const steps = [
    { id: 1, title: 'Personal Info', icon: User, completed: currentStep > 1 },
    { id: 2, title: 'Travel Details', icon: Plane, completed: currentStep > 2 },
    { id: 3, title: 'Accommodation', icon: Hotel, completed: currentStep > 3 },
    { id: 4, title: 'Special Requests', icon: FileText, completed: currentStep > 4 }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <Plane className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Flight On Budget – Tour Booking Form
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                {/* Let our travel experts create your perfect journey. Get a personalized quote within 24 hours. */}
                Please fill out the details below to confirm your booking.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>24/7 Expert Support</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Secure Booking</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  <span>Best Price Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="flex items-center space-x-4 md:space-x-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      step.completed 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : currentStep === step.id 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <step.icon className="h-6 w-6" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${
                        step.completed || currentStep === step.id ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 md:w-16 transition-all duration-300 ${
                        step.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <form 
              action="https://formsubmit.co/info@flightonbudget.com" 
              method="POST"
              onSubmit={handleSubmit}
              className="p-8 md:p-12"
            >
              {/* Hidden fields for FormSubmit */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://flightonbudget.com/thank-you" />
              <input type="hidden" name="_subject" value="New Travel Booking Request" />
              <input type="hidden" name="_template" value="table" />

              {/* Personal Information Section */}
              <div className="mb-12">
                <div className="flex items-center mb-8">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                    <p className="text-gray-600">Tell us about yourself and your travel party</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Full Name (as per passport) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                            errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.fullName}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                            errors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        />
                        {errors.dateOfBirth && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.dateOfBirth}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Passport Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="passportNumber"
                          value={formData.passportNumber}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                            errors.passportNumber ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Enter passport number"
                        />
                        {errors.passportNumber && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.passportNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Passport Expiry Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          name="passportExpiry"
                          value={formData.passportExpiry}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                            errors.passportExpiry ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        />
                        {errors.passportExpiry && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.passportExpiry}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Nationality <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                            errors.nationality ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Enter your nationality"
                        />
                        {errors.nationality && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.nationality}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="whatsappNumber"
                          value={formData.whatsappNumber}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                            errors.whatsappNumber ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="+1234567890"
                        />
                        {errors.whatsappNumber && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.whatsappNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Details Section */}
              <div className="mb-12">
                <div className="flex items-center mb-8">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <Plane className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Travel Details</h2>
                    <p className="text-gray-600">Where and when would you like to travel?</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Destination <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                          errors.destination ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="e.g., Bali, Indonesia"
                      />
                      {errors.destination && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.destination}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Departure Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                          errors.departureDate ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      />
                      {errors.departureDate && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.departureDate}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Return Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                          errors.returnDate ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      />
                      {errors.returnDate && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.returnDate}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Adults (12+) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="adultsCount"
                        value={formData.adultsCount}
                        onChange={handleInputChange}
                        min="1"
                        max="20"
                        className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                          errors.adultsCount ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="1"
                      />
                      {errors.adultsCount && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.adultsCount}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Children (2–11)
                    </label>
                    <input
                      type="number"
                      name="childrenCount"
                      value={formData.childrenCount}
                      onChange={handleInputChange}
                      min="0"
                      max="10"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Infants (&lt;2)
                    </label>
                    <input
                      type="number"
                      name="infantsCount"
                      value={formData.infantsCount}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Package Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="packageType"
                        value={formData.packageType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 appearance-none bg-white ${
                          errors.packageType ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <option value="">Select package type</option>
                        {packageTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <ArrowRight className="h-5 w-5 text-gray-400 rotate-90" />
                      </div>
                      {errors.packageType && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.packageType}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Accommodation Preferences Section */}
              <div className="mb-12">
                <div className="flex items-center mb-8">
                  <div className="bg-purple-100 rounded-full p-3 mr-4">
                    <Hotel className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Accommodation Preferences</h2>
                    <p className="text-gray-600">Choose your preferred hotel and room type</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Hotel Type
                    </label>
                    <div className="relative">
                      <select
                        name="hotelType"
                        value={formData.hotelType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 appearance-none bg-white"
                      >
                        <option value="">Select hotel type</option>
                        {hotelTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <ArrowRight className="h-5 w-5 text-gray-400 rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Room Type
                    </label>
                    <div className="relative">
                      <select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 appearance-none bg-white"
                      >
                        <option value="">Select room type</option>
                        {roomTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <ArrowRight className="h-5 w-5 text-gray-400 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Notes Section */}
              <div className="mb-12">
                <div className="flex items-center mb-8">
                  <div className="bg-orange-100 rounded-full p-3 mr-4">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Special Notes & Requests</h2>
                    <p className="text-gray-600">Any special requirements or preferences?</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Special Notes or Requests
                  </label>
                  <textarea
                    name="specialNotes"
                    value={formData.specialNotes}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 resize-none"
                    placeholder="Any special requirements, dietary restrictions, accessibility needs, or other requests..."
                  />
                </div>
              </div>

              {/* Submit Section */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Travel Request
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                <p className="text-sm text-gray-500 mt-6 max-w-md mx-auto">
                  By submitting this form, you agree to our terms and conditions. We'll get back to you within 24 hours.
                </p>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Need Immediate Assistance?</h3>
              <p className="text-blue-100 text-lg">Our travel experts are available 24/7 to help you plan your perfect trip.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <a 
                href="tel:+61290984324" 
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-200 border border-white/20 hover:border-white/40"
              >
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Call Us</p>
                    <p className="text-blue-100">+61290984324</p>
                    <p className="text-sm text-blue-200 mt-1">Available 24/7</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
              
              <a 
                href="mailto:info@flightonbudget.com" 
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-200 border border-white/20 hover:border-white/40"
              >
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Email Support</p>
                    <p className="text-blue-100">info@flightonbudget.com</p>
                    {/* <p className="text-sm text-blue-200 mt-1">Quick response</p> */}
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TravelBookingPage;
