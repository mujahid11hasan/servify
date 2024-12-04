'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          {/* Heading */}
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Book your service today.</span>
          </h2>

          {/* Buttons */}
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            {/* Book Now Button */}
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/book-service"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition duration-150 ease-in-out"
              >
                Book Now
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </Link>
            </div>

            {/* Learn More Button */}
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 transition duration-150 ease-in-out"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
