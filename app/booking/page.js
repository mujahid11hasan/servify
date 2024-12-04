'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/firebaseConfig';
import { collection, doc, getDoc, addDoc } from 'firebase/firestore';
import { FaCalendarAlt, FaClock, FaUserCheck, FaInfoCircle, FaDollarSign } from 'react-icons/fa';
import { useAuth } from '@/context/authContext';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function BookingForm() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('serviceId');

  const [serviceDetails, setServiceDetails] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    userId: currentUser?.uid || '',
    username: currentUser?.username || '',
    serviceId,
    serviceName: '',
    providerName: '',
    providerContact: '',
  });

  // Fetch selected service details
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const docRef = doc(db, 'services', serviceId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const serviceData = docSnap.data();
          setServiceDetails(serviceData);
  
          setFormData((prev) => ({
            ...prev,
            serviceName: serviceData.serviceName,
            providerName: serviceData.providerName,
            providerContact: serviceData.providerContact,
            providerUid: serviceData.providerUid, // Map providerUid correctly
          }));
        } else {
          console.error('No such service exists!');
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };
  
    if (serviceId) fetchServiceDetails();
  }, [serviceId]);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!serviceDetails?.providerUid) {
      alert('Provider information is incomplete. Please try again later.');
      return;
    }
  
    try {
      // Save booking details
      await addDoc(collection(db, 'bookings'), formData);
  
      // Create a notification for the provider
      const notificationData = {
        providerId: serviceDetails.providerUid, // Correct providerUid key
        userId: currentUser?.uid || '',
        username: currentUser?.username || '',
        serviceName: serviceDetails.serviceName,
        date: formData.date,
        time: formData.time,
        message: `You have been booked for the ${serviceDetails.serviceName} service.`,
        read: false,
        createdAt: new Date(),
      };
  
      await addDoc(collection(db, 'notifications'), notificationData);
  
      router.push('/sucess');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to book the service. Please try again.');
    }
  };
  
  

  if (!serviceDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <p className="text-gray-600">Loading service details...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-200 flex items-center justify-center py-12 px-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Book Service: {serviceDetails.serviceName}
          </h1>

          <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-inner">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Service Details</h2>
            <p className="text-gray-600">
              <FaUserCheck className="inline-block mr-2 text-purple-500" /> Provider: {serviceDetails.providerName || 'N/A'}
            </p>
            <p className="text-gray-600">
              <FaDollarSign className="inline-block mr-2 text-green-500" /> Price Per Hour: BDT {serviceDetails.pricePerHour || 'N/A'}
            </p>
            <p className="text-gray-600">
              <FaInfoCircle className="inline-block mr-2 text-blue-500" /> Experience: {serviceDetails.experience || 'N/A'} years
            </p>
            <p className="text-gray-600">
              <FaInfoCircle className="inline-block mr-2 text-red-500" /> Contact: {serviceDetails.providerContact || 'N/A'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="date">
                <FaCalendarAlt className="inline-block mr-2" /> Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="time">
                <FaClock className="inline-block mr-2" /> Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
