import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet-async';

function FAQPage() {
  return (
    <Layout>
      <Helmet>
        <title>Flight On Budget FAQs — Booking, Payments, Packages</title>
        <meta name="description" content="Answers to common questions about bookings, payments, refunds, itinerary changes and support response times." />
        <link rel="canonical" href="https://www.flightonbudget.com/faq" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Flight On Budget FAQs — Booking, Payments, Packages" />
        <meta property="og:description" content="Get answers fast: bookings, payments, refunds, changes and support." />
        <meta property="og:url" content="https://www.flightonbudget.com/faq" />
        <meta property="og:image" content="https://www.flightonbudget.com/static/og/faq-1200x630.jpg" />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do I book a package?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Choose a deal on our site or message us on WhatsApp. We’ll confirm availability and send a secure payment link.'
              }
            },
            {
              '@type': 'Question',
              name: 'What payment methods do you accept?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'We accept major cards and country-specific payment options. Your payment is processed securely online.'
              }
            }
          ]
        })}</script>
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-8 text-center">Frequently Asked Questions (FAQs)</h1>
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold text-blue-800 mb-1">1. Who is Flight On Budget?</h2>
            <p className="text-gray-700">Flight On Budget is a registered Australian travel business operated by Flight On Budget, offering international and domestic flights, holiday packages, group tours, and custom itineraries.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-800 mb-1">2. What is your company’s ABN and registration information?</h2>
            <div className="text-gray-700 space-y-1">
              <div>Company Name: Flight On Budget</div>
              {/* <div>Trading Name: Flight On Budget</div> */}
              {/* <div>ABN: 46 642 305 299</div> */}
              <div>Registered Address: Sydney, Australia</div>
              <div>Email: Info@flightonbudget.com</div>
              <div>Phone/WhatsApp: +61 480 810 519</div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-800 mb-1">3. What services do you offer?</h2>
            <ul className="list-disc list-inside text-gray-700 ml-6">
              <li>International & domestic flight bookings</li>
              <li>Flights + hotel packages</li>
              <li>Group tours</li>
              <li>Customized holiday itineraries</li>
              <li>Visa and travel consultation (on request)</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-800 mb-1">4. How can I book a package with you?</h2>
            <p className="text-gray-700 mb-1">You can book through:</p>
            <ul className="list-disc list-inside text-gray-700 ml-6">
              <li>WhatsApp or phone at +61 480 810 519</li>
              <li>Email at Info@flightonbudget.com</li>
              <li>Website (if online booking is available)</li>
            </ul>
            <p className="text-gray-700 mt-1">We will send you travel options, payment details, and confirmation once booking is finalized.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-800 mb-1">5. What payment methods do you accept?</h2>
            <ul className="list-disc list-inside text-gray-700 ml-6">
              <li>Credit/Debit Card via PayPal</li>
              <li>Bank Transfer</li>
              <li>PayID</li>
            </ul>
            <p className="text-gray-700 mt-1">Note: We do not accept cash payments.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-800 mb-1">6. Is my booking confirmed immediately after payment?</h2>
            <p className="text-gray-700">Your booking is confirmed once we receive payment and you receive a written confirmation (via email or WhatsApp). Tickets and vouchers are issued after full payment is received.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-800 mb-1">7. Can I cancel or change my booking?</h2>
            <p className="text-gray-700">Yes, depending on the airline/hotel rules. Fees may apply. Please review our Cancellation & Refund Policy or contact us for specific details.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-800 mb-1">8. Do you offer travel insurance?</h2>
            <p className="text-gray-700">We do not sell insurance directly, but we strongly recommend purchasing comprehensive travel insurance covering cancellations, health emergencies, and baggage loss.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-800 mb-1">9. Is my personal information safe with Flight On Budget?</h2>
            <p className="text-gray-700">Yes. We follow Australian privacy laws and only collect information needed for your travel arrangements. We do not share your data with third parties without your consent.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-800 mb-1">10. What happens if my flight is cancelled or delayed?</h2>
            <p className="text-gray-700">While Flight On Budget is not responsible for airline operations, we will assist you in coordinating with the airline to resolve issues or rebook if required.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FAQPage; 