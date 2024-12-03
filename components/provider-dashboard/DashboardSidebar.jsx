'use client';

import { FaTachometerAlt } from 'react-icons/fa';
import { Bell } from 'lucide-react';
import Link from 'next/link';

const DashboardSidebar = () => {
  return (
    <div className="w-48 bg-gray-800 text-white min-h-screen">
    
      <ul className="mt-6 space-y-4">
        <li className="px-6 py-2 hover:bg-gray-700 flex items-center">
          <FaTachometerAlt className="mr-2" />
          <Link href="/provider-dashboard">Dashboard</Link>
        </li>
       
        <li className="px-6 py-2 hover:bg-gray-700 flex items-center">
          <Bell className="mr-2" />
          <Link href="/job-request">Notifications</Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;