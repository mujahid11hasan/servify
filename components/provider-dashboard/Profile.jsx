'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const Profile = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
    console.log(currentUser);
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Fallback values in case some user data is missing
  const userName = currentUser.name;
  const userContact = currentUser.contact;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
      <div className="mt-4 space-y-4">
        <div className="flex items-center">
          <FaUser className="text-gray-600 mr-2" />
          <p className='text-black'><strong>Name: </strong>{userName}</p>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="text-gray-600 mr-2" />
          <p className='text-black'><strong>Email: </strong>{currentUser.email}</p>
        </div>
        <div className="flex items-center">
          <FaPhone className="text-gray-600 mr-2" />
          <p className='text-black'><strong>Contact: </strong>{userContact}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;