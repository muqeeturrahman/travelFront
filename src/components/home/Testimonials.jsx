import React from 'react';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { reviews } from '../../constants/reviews';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read trusted reviews from our customers about their flight booking experience with GoTrip
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper !pb-16"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{review.name}</h3>
                      <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <p className="text-gray-600 flex-grow">{review.comment}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: #3B82F6;
        }
        .testimonials-swiper .swiper-button-next,
        .testimonials-swiper .swiper-button-prev {
          color: #3B82F6;
        }
        .testimonials-swiper .swiper-button-next:after,
        .testimonials-swiper .swiper-button-prev:after {
          font-size: 24px;
        }
        @media (max-width: 640px) {
          .testimonials-swiper .swiper-button-next,
          .testimonials-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Testimonials; 