import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What our customers are saying us?</h2>
          <p className="text-gray-500 mb-8">
            These popular destinations have a lot to offer
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Customer"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            
            <p className="text-gray-600 italic mb-6">
              "The place is in a great location in London. The area is safe and beautiful. The apartment was comfortable and the host was kind and responsive to our requests. Made a nice place"
            </p>
            
            <div className="flex justify-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-bold text-gray-900">James Black</h4>
              <p className="text-gray-500 text-sm">London, UK</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-16">
            <div className="text-center">
              <p className="text-blue-600 font-bold text-3xl mb-1">13m+</p>
              <p className="text-gray-500 text-sm">Happy Users</p>
            </div>
            
            <div className="text-center">
              <p className="text-blue-600 font-bold text-3xl mb-1">4.88</p>
              <div className="flex justify-center mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-sm">Overall rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 