import React from 'react';

const flightDeals = [
  {
    route: 'Melbourne to Delhi',
    price: '$489 Return',
    details: [
      '30kg Baggage',
      'Layover: 2–3 hrs',
      'Limited Seats',
      'Eid Special',
      'Call Now to Book!'
    ],
    imageUrl: 'https://s7ap1.scene7.com/is/image/incredibleindia/india-gate-delhi-1-attr-hero?qlt=82&ts=1727351922349', // Delhi
  },
  {
    route: 'Sydney to Mumbai',
    price: '$520 Return',
    details: [
      'Flexible Dates',
      'Free Rescheduling',
      'WhatsApp to Lock Deal'
    ],
    imageUrl: 'https://greatruns.com/wp-content/uploads/2017/04/mumbai-cover.jpeg', // Mumbai
  },
  {
    route: 'Sydney to Lahore',
    price: '$598 Return',
    details: [
      'Turkish/Qatar/Air Arabia',
      '35kg Baggage',
      'Fast Layover',
      'Only via WhatsApp or Toll-Free Booking'
    ],
    imageUrl: 'https://www.arup.com/globalassets/images/projects/l/lahore-safe-city-project/lahore-safe-city-hero.jpg?width=1840&height=1035&quality=80', // Lahore
  },
  {
    route: 'Melbourne to Islamabad',
    price: '$579 Return',
    details: [
      'Verified Deal',
      'Limited Time Only',
      'Group Discounts Available'
    ],
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7UfM6DrzLNJ_FY2lt5yuOayfEY1I7Ll_vZQ&s', // Islamabad
  },
  {
    route: 'Brisbane to Manila',
    price: '$499 Return',
    details: [
      'Direct & Layover Options',
      '25kg Baggage',
      'Super Saver Fare',
      'Book via PAYID or WhatsApp'
    ],
    imageUrl: 'https://filmphilippines.com/sites/default/files/manila-image.png', // Manila
  },
  {
    route: 'Sydney to Ho Chi Minh',
    price: '$375 Return',
    details: [
      'Vietnam Airlines / Bamboo Air',
      '20kg Check-in',
      'DM to Reserve Now – Only 10 Seats Left!'
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/DJI_0550-HDR-Pano.jpg', // Ho Chi Minh
  },
  {
    route: 'Melbourne to Beijing',
    price: '$499 Return',
    details: [
      'Flexible Schedule',
      'Direct & Short-Layover Routes',
      'Early Bird Offer Ends Soon!'
    ],
    imageUrl: 'https://www.shutterstock.com/image-photo/beijing-city-skyline-buildings-600nw-1170044425.jpg', // Beijing
  },
  {
    route: 'Sydney to London',
    price: '$850 Return',
    details: [
      'Qatar / Emirates / Etihad',
      'Perfect for July Travel',
      'Book Now & Get Priority Seating'
    ],
    imageUrl: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?cs=srgb&dl=pexels-dominikagregus-672532.jpg&fm=jpg', // London
  },
  {
    route: 'Melbourne to Auckland',
    price: '$199 Return',
    details: [
      'Carry-On Included',
      'Perfect Weekend Getaway',
      'Pay via PAYID',
      'Message Us to Hold Your Seat Now'
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Auckland_Skyline_as_seen_from_Devonport_20100128_3.jpg', // Auckland
  },
];

const whatsappNumber = '+61480810519';
const phoneNumber = '+61480810519';

function FlightPromos() {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Our Flight Deals By Searching Flights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flightDeals.map((deal, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url('${deal.imageUrl}')` }}
              />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-blue-600">{deal.route.split(' to ')[0]}</span>
                  <span className="text-sm text-gray-500">to</span>
                  <span className="text-sm font-semibold text-blue-600">{deal.route.split(' to ')[1] || deal.route.split(' — ')[0]}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{deal.route}</h3>
                <span className="text-2xl font-bold text-blue-700 mb-2">{deal.price}</span>
                <ul className="mb-4 list-disc list-inside text-gray-600">
                  {deal.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
                <div className="mt-auto flex gap-2">
                  <a
                    href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 text-center font-semibold"
                  >
                    Book on WhatsApp
                  </a>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center font-semibold"
                  >
                    Call to Book
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FlightPromos;