'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { FaUser, FaPhone, FaBriefcase, FaMoneyBillWave, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

export default function ServiceCard() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'services'));
        const fetchedServices = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(fetchedServices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/user-login');
    }
  }, [currentUser, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-600">
        <FaSpinner className="animate-spin text-white text-6xl" />
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-grary-200">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4 mx-auto" />
          <p className="text-xl text-gray-800">No services available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-black">Available Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
              <h2 className="text-2xl font-semibold text-white mb-2">{service.serviceName}</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center text-gray-700 mb-4">
                <FaUser className="text-purple-500 mr-2" />
                <p><strong>Provider:</strong> {service.providerName || 'N/A'}</p>
              </div>
              <div className="flex items-center text-gray-700 mb-4">
                <FaPhone className="text-green-500 mr-2" />
                <p><strong>Contact:</strong> {service.providerContact || 'N/A'}</p>
              </div>
              <div className="flex items-center text-gray-700 mb-4">
                <FaBriefcase className="text-blue-500 mr-2" />
                <p><strong>Experience:</strong> {service.experience} years</p>
              </div>
              <div className="flex items-center text-gray-700 mb-6">
                <FaMoneyBillWave className="text-yellow-500 mr-2" />
                <p><strong>Price per Hour:</strong> BDT {service.pricePerHour}</p>
              </div>
              <button
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition duration-300 transform hover:scale-105"
                onClick={() =>
                  router.push(`/booking?serviceId=${service.id}&serviceName=${service.serviceName}`)
                }
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

