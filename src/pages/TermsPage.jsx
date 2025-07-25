import React from 'react';
import Layout from '../components/Layout';
import Logo from '../components/Logo';

function TermsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2 text-center">Terms & Conditions</h1>
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <p className="text-gray-600 mb-2 text-center">Effective Date: 1 February 2021</p>
          <div className="mb-6 text-center text-gray-700">
            <div>Business Name: <b>Palki Group Pty Ltd (Trading as Palki Travel)</b></div>
            <div>ABN: 46 642 305 299</div>
            <div>Registered Address: Unit 14, 1–3 Clarence Street, Strathfield NSW 2135, Australia</div>
            <div className="flex justify-center items-center gap-2 mt-2">
              {/* Email Icon */}
              <svg className="w-5 h-5 text-blue-700 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M22 6l-10 7L2 6" /></svg>
              <a href="mailto:support@palkitravel.com" className="text-blue-700 underline">support@palkitravel.com</a>
            </div>
            <div className="flex justify-center items-center gap-2 mt-1">
              {/* WhatsApp Icon */}
              <svg className="w-5 h-5 text-green-600 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.22-1.25-6.24-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.4 0 4.63.84 6.42 2.36A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
              <a href="tel:+61480810519" className="text-blue-700 underline">+61 480 810 519</a>
            </div>
          </div>
          <hr className="my-6 border-gray-200" />
          <ol className="list-decimal list-inside space-y-6 text-gray-800">
            <li>
              <b>Acceptance of Terms</b>
              <p className="mt-1">By accessing or booking through Palki Travel, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please refrain from using our services.</p>
            </li>
            <li>
              <b>Services We Provide</b>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>International and domestic flight bookings</li>
                <li>Flight + hotel packages</li>
                <li>Group tours and holiday packages</li>
                <li>Customised travel itineraries</li>
              </ul>
              <p className="mt-1">All services are subject to availability and governed by third-party provider rules, terms, and applicable service charges.</p>
            </li>
            <li>
              <b>Booking Process</b>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>A booking is considered confirmed only after full or partial payment is received and acknowledged in writing (via email or WhatsApp).</li>
                <li>You are responsible for providing accurate personal and travel information at the time of booking.</li>
                <li>It is your responsibility to ensure passport validity, visa requirements, and compliance with international travel regulations.</li>
              </ul>
            </li>
            <li>
              <b>Payment Terms</b>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Accepted payment methods include PAYID, bank transfer, debit/credit card, or other agreed options.</li>
                <li>Full payment must be completed before travel documents are issued, unless a Pay Later option has been agreed in writing.</li>
                <li>Failure to pay on time may result in booking cancellation or delays.</li>
              </ul>
            </li>
            <li>
              <b>Cancellation & Refund Policy</b>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Flights: Subject to the airline’s fare rules, penalties, and refund conditions.</li>
                <li>Packages: May include a non-refundable deposit and/or service fees.</li>
                <li>No-Shows or Late Cancellations: No refund will be provided.</li>
                <li>Refunds may take 7–21 business days, depending on third-party processing timelines.</li>
              </ul>
              <p className="mt-1">For detailed refund terms, please contact: <a href="mailto:support@palkitravel.com" className="text-blue-700 underline">support@palkitravel.com</a></p>
            </li>
            <li>
              <b>Changes to Bookings</b>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>All changes must be requested in writing.</li>
                <li>Changes are subject to availability, airline/hotel policies, and applicable fees.</li>
                <li>A service fee may be applied by Palki Travel in addition to provider charges.</li>
              </ul>
            </li>
            <li>
              <b>Responsibilities & Liabilities</b>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Palki Travel acts as a travel booking agent and cannot be held responsible for:</li>
                <ul className="list-disc list-inside ml-10">
                  <li>Airline or provider cancellations, delays, or schedule changes</li>
                  <li>Missed connections or flights due to traveler error</li>
                  <li>Loss, damage, or delay of baggage or personal items</li>
                  <li>Service issues caused by third-party vendors</li>
                </ul>
              </ul>
              <p className="mt-1">However, we will do our best to assist you in resolving such issues through the appropriate channels.</p>
            </li>
            <li>
              <b>Travel Insurance</b>
              <p className="mt-1">We strongly recommend all customers obtain comprehensive travel insurance to cover trip cancellations, medical emergencies, baggage loss, and other unforeseen events.</p>
            </li>
            <li>
              <b>Privacy Policy</b>
              <p className="mt-1">Your personal information is handled in accordance with our Privacy Policy and Australian privacy legislation. We do not share your data with third parties without your explicit consent.</p>
            </li>
            <li>
              <b>Governing Law</b>
              <p className="mt-1">These Terms & Conditions are governed by the laws of New South Wales, Australia. Any disputes arising in connection with these terms shall be subject to the jurisdiction of NSW courts.</p>
            </li>
            <li>
              <b>Contact Us</b>
              <p className="mt-1">For questions or clarifications regarding these terms, please contact:</p>
              <ul className="list-disc list-inside ml-6">
                <li>
                  <span className="inline-flex items-center">
                    <svg className="w-5 h-5 mr-1 text-blue-700 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M22 6l-10 7L2 6" /></svg>
                    <a href="mailto:support@palkitravel.com" className="text-blue-700 underline">support@palkitravel.com</a>
                  </span>
                </li>
                <li>
                  <span className="inline-flex items-center">
                    <svg className="w-5 h-5 mr-1 text-green-600 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.22-1.25-6.24-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.4 0 4.63.84 6.42 2.36A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
                    <a href="tel:+61480810519" className="text-blue-700 underline">+61 480 810 519</a>
                  </span>
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}

export default TermsPage; 