'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';

const DashboardHeader = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Redirect the user to the login page if not logged in
  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/provider-login');
    } else {
      setLoading(false);
    }
  }, [currentUser, router]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/'); // Redirect to home after logging out
    } catch (error) {
      console.error('Logout failed', error);
      alert('Failed to log out');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Welcome, {currentUser.name}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardHeader;
