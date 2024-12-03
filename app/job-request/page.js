'use client';

import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useAuth } from '@/context/authContext';
import { Bell, Calendar, Clock } from 'lucide-react';
import DashboardHeader from '@/components/provider-dashboard/DashboardHeader';
import DashboardSidebar from '@/components/provider-dashboard/DashboardSidebar';

export default function NotificationsPage() {
    const { currentUser } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, 'notifications'),
            where('providerId', '==', currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newNotifications = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNotifications(newNotifications);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    return (
        <div className="flex">
            <DashboardSidebar />
            <div className="w-full">
                <DashboardHeader />

                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                        Notifications
                    </h1>
                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, index) => (
                                <div
                                    key={index}
                                    className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg p-4"
                                >
                                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    ) : notifications.length > 0 ? (
                        <div className="space-y-4">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out transform hover:scale-102 ${notif.read
                                            ? 'border-l-4 border-gray-400 dark:border-gray-600'
                                            : 'border-l-4 border-blue-500'
                                        }`}
                                >
                                    <div className="flex items-center mb-2">
                                        <Bell className="w-5 h-5 mr-2 text-blue-500" />
                                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                            {notif.serviceName}
                                        </h2>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-3">{notif.message}</p>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        <span className="mr-3">{notif.date}</span>
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span>{notif.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                         Booked by: {notif.username}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Bell className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                            <p className="text-xl text-gray-600 dark:text-gray-400">No notifications yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

