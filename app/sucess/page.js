'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-6">Your booking has been successfully confirmed.</p>
        <button
          className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={() => router.push('/explore')}
        >
          Explore More Services
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
}
