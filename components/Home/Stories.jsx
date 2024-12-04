'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Provider data
const providerStories = [
  {
    name: 'John Doe',
    role: 'Plumber',
    statement: 'I love helping homeowners solve their plumbing issues quickly and efficiently.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    name: 'Jane Smith',
    role: 'Electrician',
    statement: 'Ensuring the safety of electrical systems in homes is my top priority.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    name: 'Mike Johnson',
    role: 'Carpenter',
    statement: 'Creating beautiful, functional spaces for families brings me joy every day.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    name: 'Emily Brown',
    role: 'Painter',
    statement: 'I believe a fresh coat of paint can transform any space into something special.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    name: 'David Lee',
    role: 'HVAC Technician',
    statement: 'Keeping homes comfortable year-round is both challenging and rewarding.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=300'
  }
];

export default function ProviderStories() {
  const [domLoaded, setDomLoaded] = useState(false);

  // Wait for DOM to be loaded to avoid hydration issues
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Our Service Providers
        </h2>
        {domLoaded && (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mySwiper"
          >
            {providerStories.map((provider, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Image Section */}
                  <div className="relative h-48">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">{provider.name}</h3>
                    <p className="text-sm text-blue-600 mb-4">{provider.role}</p>
                    <p className="text-gray-600 italic">"{provider.statement}"</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
