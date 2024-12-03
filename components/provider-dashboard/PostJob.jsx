'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { db } from '@/firebaseConfig';
import { setDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { FaBriefcase, FaDollarSign, FaPhone } from 'react-icons/fa';

export default function PostJob() {
    const { currentUser } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [serviceName, setServiceName] = useState('');
    const [experience, setExperience] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [postedJobs, setPostedJobs] = useState([]);

    // Fetch posted jobs for the current user
    useEffect(() => {
        const fetchPostedJobs = async () => {
            try {
                const q = query(collection(db, 'services'), where('providerUid', '==', currentUser.uid));
                const querySnapshot = await getDocs(q);

                const jobs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPostedJobs(jobs);
            } catch (error) {
                console.error('Error fetching posted jobs: ', error);
            }
        };

        if (currentUser) {
            fetchPostedJobs();
        }
    }, [currentUser]);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!serviceName || !experience || !pricePerHour) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Add a new document in the "services" collection
            await setDoc(doc(db, 'services', currentUser.uid + "_" + serviceName), {
                serviceName,
                experience,
                pricePerHour,
                providerUid: currentUser.uid,
                providerName: currentUser.name || 'N/A', // Provider Name
                providerContact: currentUser.contact || 'N/A', // Provider Contact
            });

            // Refresh posted jobs list
            const q = query(collection(db, 'services'), where('providerUid', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);
            const jobs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPostedJobs(jobs);

            setModalOpen(false); // Close the modal after successful submission
            setServiceName('');
            setExperience('');
            setPricePerHour('');
            alert('Service posted successfully!');
        } catch (error) {
            console.error('Error posting service: ', error);
            setError('Error posting service. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Post a Job
            </button>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4 text-black">Post a Service</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold text-black">Service Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                                    value={serviceName}
                                    onChange={(e) => setServiceName(e.target.value)}
                                    placeholder="e.g. Plumber, AC Mechanic"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold text-black">Experience (in years)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    placeholder="e.g. 5 years"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold text-black">Price per Hour</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                                    value={pricePerHour}
                                    onChange={(e) => setPricePerHour(e.target.value)}
                                    placeholder="e.g. 50"
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md "
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    disabled={loading}
                                >
                                    {loading ? 'Posting...' : 'Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Display Posted Jobs */}
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Your Posted Jobs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {postedJobs.length === 0 ? (
                        <p>No jobs posted yet.</p>
                    ) : (
                        postedJobs.map((job) => (
                            <div key={job.id} className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg shadow-md text-white">
                                <h4 className="font-semibold text-lg mb-2 flex items-center">
                                    <FaBriefcase className="mr-2" /> {job.serviceName}
                                </h4>
                                <p className="text-white mb-1 flex items-center">
                                    <FaBriefcase className="mr-2" /> Experience: {job.experience} years
                                </p>
                                <p className="text-white mb-1 flex items-center">
                                    <FaDollarSign className="mr-2" /> Price per Hour: BDT {job.pricePerHour}
                                </p>
                                <p className="text-white flex items-center">
                                    <FaPhone className="mr-2" /> Contact: {job.providerContact}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
