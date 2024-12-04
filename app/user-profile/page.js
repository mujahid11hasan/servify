'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/firebaseConfig';
import { useAuth } from '@/context/authContext';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { FaUser, FaEnvelope, FaCalendarAlt, FaClock, FaBriefcase, FaSpinner,FaPhone } from 'react-icons/fa';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function UserProfile() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const docRef = doc(db, 'users', currentUser?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.error('No such user exists!');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (currentUser) fetchUserDetails();
  }, [currentUser]);

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const q = query(collection(db, 'bookings'), where('userId', '==', currentUser?.uid));
        const querySnapshot = await getDocs(q);
        const bookingData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) fetchBookings();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <FaSpinner className="animate-spin text-gray-500 text-6xl" />
      </div>
    );
  }

  return (
    <>
        <Navbar />
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* User Profile Section */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <h1 className="text-3xl font-bold mb-4">User Profile</h1>
          <div className="flex items-center mb-4">
            <FaUser className="text-2xl mr-2" />
            <span className="text-lg">{userDetails?.username || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-2xl mr-2" />
            <span className="text-lg">{userDetails?.email || 'N/A'}</span>
          </div>
        </div>

        {/* Booking History Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking History</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-600">You have no bookings yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
                >
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{booking.serviceName}</h3>
                  <p className="text-gray-700 mb-1">
                    <FaCalendarAlt className="inline-block mr-2 text-purple-500" />
                    Date: {booking.date}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <FaClock className="inline-block mr-2 text-green-500" />
                    Time: {booking.time}
                  </p>
                  <p className="text-gray-700">
                    <FaBriefcase className="inline-block mr-2 text-yellow-500" />
                    Provider: {booking.providerName || 'N/A'}
                  </p>
                  <p className="text-gray-700">
                    <FaPhone className="inline-block mr-2 text-blue-500" />
                    Contact: {booking.providerContact || 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
