'use client';

import React from 'react';
import { Wrench, Zap, Droplet, WrenchIcon } from 'lucide-react';
import { FaPaintBrush, FaHammer } from 'react-icons/fa';

// Service data
const services = [
  { name: 'Plumbing', icon: Wrench, description: 'Expert plumbing solutions for your home' },
  { name: 'Painting', icon: FaPaintBrush, description: 'Transform your space with our professional painting services' },
  { name: 'Electrical', icon: Zap, description: 'Safe and reliable electrical repairs and installations' },
  { name: 'Water Damage', icon: Droplet, description: 'Swift and effective water damage restoration' },
  { name: 'Air Condition', icon: WrenchIcon, description: 'Heating, ventilation, and air conditioning services' },
  { name: 'Roofing', icon: FaHammer, description: 'Professional roofing repairs and installations' }
];

export default function Services() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Comprehensive home care solutions tailored to your needs
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="relative group bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
              <div className="relative z-10">
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full text-blue-600 group-hover:text-white group-hover:bg-blue-50/20 transition-colors duration-300 ease-in-out">
                  <service.icon className="w-6 h-6" />
                </div>
                {/* Service Title */}
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white transition-colors duration-300 ease-in-out">
                  {service.name}
                </h3>
                {/* Service Description */}
                <p className="mt-2 text-gray-600 group-hover:text-blue-50 transition-colors duration-300 ease-in-out">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
