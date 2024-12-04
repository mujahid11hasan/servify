'use client';

import React from 'react';
import { Clock, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Home Repair"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Service Cards */}
          <div className="space-y-6">
            {/* Service Cards */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Local US Professional</h3>
                  <p className="text-sm text-gray-600">Trusted experts in your area</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Flexible Appointments</h3>
                  <p className="text-sm text-gray-600">Book at your convenience</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">24H Availability</h3>
                  <p className="text-sm text-gray-600">Emergency services available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Take Care of Your Home with Exceptional Repairs
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-lg">
              At Servify, we understand the importance of maintaining and enhancing your home. With our exceptional repair services, we ensure that your home remains in top condition.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center px-6 py-3 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-blue-400/50 z-[1]" />
    </div>
  );
}
