'use client'

import React from 'react'
import Image from 'next/image'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export default function AboutUsPage() {
  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12 animate-fade-in-down">
          About Us
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-fade-in-left">
            <h2 className="text-3xl font-semibold text-gray-800">
              Our Story
            </h2>
            <p className="text-lg text-gray-600">
              Founded in 2023, our company has been at the forefront of innovation in the tech industry. We believe in creating solutions that make a difference in people's lives.
            </p>
            <p className="text-lg text-gray-600">
              Our team of passionate individuals works tirelessly to push the boundaries of what's possible, always with our customers in mind.
            </p>
          </div>
          <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-xl animate-fade-in-right">
            <Image
              src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our team collaborating"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 ease-in-out transform hover:scale-110"
            />
          </div>
        </div>
        
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Innovation', 'Integrity', 'Collaboration', 'Excellence'].map((value, index) => (
              <div 
                key={value} 
                className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value}</h3>
                <p className="text-gray-600">
                    We believe in {value.toLowerCase()} and strive to uphold this value in everything we do.
                </p>
              </div>
            ))}
          </div>
        </div>
    
      </div>
    </div>
    <Footer />
    </div>
  )
}

