'use client';
import React from 'react'
import { CheckCircle } from 'lucide-react'

const features = [
  'Experienced professionals',
  'Quality guaranteed services',
  '24/7 customer support',
  'Competitive pricing',
  'Eco-friendly solutions',
  'Fully insured and licensed',
]

export default function About() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About Our Platform
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              With over 20 years of experience, we've been providing top-notch home services to thousands of satisfied customers. Our commitment to quality, reliability, and customer satisfaction sets us apart in the industry.
            </p>
            <dl className="mt-10 space-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <p className="ml-3 text-base text-gray-700">{feature}</p>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-10 lg:mt-0 relative">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Team"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gray-900 opacity-30" />
               
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob" />
            <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000" />
          </div>
        </div>
      </div>
    </section>
  )
}

