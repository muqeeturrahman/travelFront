import React from 'react';

const flightDeals = [
  // {
  //   route: 'Toronto to India (Delhi, Mumbai, Chennai)',
  //   price: 'CAD 699 Return',
  //   airlines: ['Air India', 'Air Canada', 'Emirates (1-stop Dubai)'],
  //   includes: ['2 checked bags', 'Meal', 'Seat selection'],
  //   specialOffers: [
  //     'Early bird special — book 30 days in advance and save extra 10%',
  //     'Group Offer: Book 3+ tickets, get 15% off total fare'
  //   ],
  //   imageUrl: 'https://s7ap1.scene7.com/is/image/incredibleindia/india-gate-delhi-1-attr-hero?qlt=82&ts=1727351922349',
  // },
  // {
  //   route: 'Toronto to China (Beijing, Shanghai, Hong Kong)',
  //   price: 'CAD 799 Return',
  //   airlines: ['Air Canada', 'Cathay Pacific', 'China Eastern'],
  //   includes: ['1 checked bag', 'Meal', 'Flexible date changes'],
  //   specialOffers: [
  //     'Flash Sale: Limited seats at this price, book now!',
  //     'Family Deal: Kids under 12 fly at 50% off on group bookings'
  //   ],
  //   imageUrl: 'https://www.shutterstock.com/image-photo/beijing-city-skyline-buildings-600nw-1170044425.jpg',
  // },
  // {
  //   route: 'Toronto to Philippines (Manila, Cebu)',
  //   price: 'CAD 599 Return',
  //   airlines: ['Philippine Airlines', 'Air Canada'],
  //   includes: ['2 checked bags', 'Meals'],
  //   specialOffers: [
  //     'Free airport transfer in Manila with return combo',
  //     'Group Discount: Save 12% on 4+ travelers'
  //   ],
  //   imageUrl: 'https://filmphilippines.com/sites/default/files/manila-image.png',
  // },
  // {
  //   route: 'Toronto to Pakistan (Karachi, Lahore, Islamabad)',
  //   price: 'CAD 649 Return',
  //   airlines: ['Emirates', 'Qatar Airways', 'PIA'],
  //   includes: ['2 checked bags', 'Meals'],
  //   specialOffers: [
  //     'Flexible ticket date change without fee',
  //     'Children under 5 fly free with 2 paying adults'
  //   ],
  //   imageUrl: 'https://www.arup.com/globalassets/images/projects/l/lahore-safe-city-project/lahore-safe-city-hero.jpg?width=1840&height=1035&quality=80',
  // },
  // {
  //   route: 'Toronto to Caribbean (Jamaica, Trinidad & Tobago)',
  //   price: 'CAD 399 Return',
  //   airlines: ['Air Canada', 'WestJet', 'Caribbean Airlines'],
  //   includes: ['1 checked bag', 'Meals'],
  //   specialOffers: ['Group Offer: 10% off on 3+ travelers'],
  //   imageUrl: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?cs=srgb&dl=pexels-dominikagregus-672532.jpg&fm=jpg',
  // },
  // {
  //   route: 'Vancouver to China (Guangzhou, Shanghai, Beijing, Hong Kong)',
  //   price: 'CAD 749 Return',
  //   airlines: ['Air Canada', 'Cathay Pacific', 'China Southern'],
  //   includes: ['1 checked bag', 'Meals', 'Flexible dates'],
  //   specialOffers: [
  //     'Flash Deal: Book within 48 hours to lock price',
  //     'Family Discount: Kids under 12 at 50% off'
  //   ],
  //   imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/DJI_0550-HDR-Pano.jpg',
  // },
  // {
  //   route: 'Vancouver to India (Delhi, Mumbai, Amritsar)',
  //   price: 'CAD 699 Return',
  //   airlines: ['Air India', 'Air Canada', 'Emirates'],
  //   includes: ['2 checked bags', 'Meal', 'Seat selection'],
  //   specialOffers: [
  //     'Save extra 8% if booked 2 months prior',
  //     'Group Discount: 15% off for 3 or more travelers'
  //   ],
  //   imageUrl: 'https://greatruns.com/wp-content/uploads/2017/04/mumbai-cover.jpeg',
  // },
  // {
  //   route: 'Vancouver to Philippines (Manila, Cebu)',
  //   price: 'CAD 579 Return',
  //   airlines: ['Philippine Airlines', 'Cathay Pacific', 'Air Canada'],
  //   includes: ['2 checked bags', 'Meals'],
  //   specialOffers: [
  //     '5% off with airport transfer combo',
  //     'Kids under 12 fly at half price'
  //   ],
  //   imageUrl: 'https://mlafqlkvsrtu.i.optimole.com/w:1080/h:688/q:mauto/f:best/https://islandhoppinginthephilippines.com/visayas/wp-content/uploads/2019/09/Cebu-City-at-night.jpeg',
  // },
  // {
  //   route: 'Vancouver to Iran (Tehran)',
  //   price: 'CAD 899 Return',
  //   airlines: ['Qatar Airways', 'Turkish Airlines'],
  //   includes: ['2 checked bags', 'Meals'],
  //   specialOffers: [
  //     'Flexible rescheduling included',
  //     'Group Discount: Save 10% on bookings of 3+ travelers'
  //   ],
  //   imageUrl: 'https://www.adventureiran.com/wp-content/uploads/2022/11/Tehran-Water-and-Fire-Park-Ab-va-Atash.jpg',
  // },
  // {
  //   route: 'Vancouver to South Korea (Seoul)',
  //   price: 'CAD 749 Return',
  //   airlines: ['Korean Air', 'Asiana', 'Air Canada'],
  //   includes: ['1 checked bag', 'Meals', 'Seat selection'],
  //   specialOffers: [
  //     'Flash Sale: Limited seats at this price, book ASAP!',
  //     'Family Discount: Kids fly 50% off for group bookings'
  //   ],
  //   imageUrl: 'https://content.r9cdn.net/rimg/dimg/ff/d2/794e703d-city-35982-1620c5d9650.jpg?width=1366&height=768&xhint=2242&yhint=1445&crop=true',
  // },
  // ------------------------
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
const phoneNumber = '+61290984324';

function FlightPromos() {
  return (
    <section className="py-12 px-4 bg-gray-50">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Explore Our Flight Deals By Searching Flights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {flightDeals.map((deal, idx) => {
          // Calculate original price (20% higher)
          let discountedPrice = deal.price;
          let originalPrice = null;
          // Try to extract numeric value from price string
          const priceMatch = String(deal.price).match(/([A-Z$]+)\s?(\d+(?:\.\d+)?)/i);
          if (priceMatch) {
            const currency = priceMatch[1];
            const priceNum = parseFloat(priceMatch[2]);
            const origNum = Math.round(priceNum * 1.2);
            originalPrice = `${currency} ${origNum} Return`;
          }
          return (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url('${deal.imageUrl}')` }}
              />
              <div className="p-6 flex flex-col flex-1">
                {/* Price Display */}
                <div className="mb-2 flex items-baseline gap-2">
                  {originalPrice && (
                    <span className="text-gray-400 line-through text-lg font-semibold">{originalPrice}</span>
                  )}
                  <span className="text-2xl font-bold text-blue-600">{discountedPrice}</span>
                </div>
                <h3 className="text-xl font-bold mb-1 text-blue-800">{deal.route}</h3>

                {/* Details (always show for every deal) */}
                {deal.details && (
                  <ul className="mb-4 list-disc list-inside text-sm text-gray-700">
                    {deal.details.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

              {/* Airlines */}
              {deal.airlines && (
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-700">Airlines:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {deal.airlines.map((airline, i) => (
                      <li key={i}>{airline}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Includes */}
              {deal.includes && (
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-700">Includes:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {deal.includes.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Special Offers */}
              {deal.specialOffers && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700">Special Offers:</h4>
                  <ul className="list-disc list-inside text-sm text-green-600">
                    {deal.specialOffers.map((offer, i) => (
                      <li key={i}>{offer}</li>
                    ))}
                  </ul>
                </div>
              )}

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
        );
      })}
      </div>
    </div>
  </section>
  );
}

export default FlightPromos;