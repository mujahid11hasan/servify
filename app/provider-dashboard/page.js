'use client';

import { useEffect, useState } from 'react';
import { requireAuth } from '../utils/requireAuth';
import { useAuth } from '@/context/authContext';
import DashboardSidebar from '@/components/provider-dashboard/DashboardSidebar';
import DashboardHeader from '@/components/provider-dashboard/DashboardHeader';
import Profile from '@/components/provider-dashboard/Profile';
import PostJob from '@/components/provider-dashboard/PostJob';

const ProviderDashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated with the correct role
  const isAuthenticated = requireAuth('Service Provider');

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  // Show loading screen while the authentication process is happening
  if (loading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <div className="p-4">
          <Profile user={currentUser} />
        </div>
        <div className="p-4">
          <PostJob />
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
