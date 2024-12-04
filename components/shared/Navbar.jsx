'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../app/fonts/servifylogo.png'
import { useAuth } from '@/context/authContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSignUpClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUserSignUp = () => {
    router.push('auth/user-signup');
    setIsModalOpen(false);
  };

  const handleProviderSignUp = () => {
    router.push('auth/provider-signup');
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image src={logo} alt="Servify" className="h-8 w-auto ml-2" priority />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center flex-grow justify-center">
              <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200">About</Link>
              <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200">Contact</Link>
              <Link href="/auth/provider-signup" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">Join as Service Provider</Link>
            </div>
            <div className="hidden sm:flex sm:items-center">
              {currentUser ? (
                <>
                  <Link href="/user-profile">
                    <span className="text-sm font-medium text-gray-700 cursor-pointer">
                      Hello, {currentUser.username}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/user-login"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <button
                    onClick={handleSignUpClick}
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About</Link>
              <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact</Link>
              <Link href="/signup-provider" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600">Join as Service Provider</Link>
              <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Login</Link>
              <button onClick={handleSignUpClick} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-green-500 hover:bg-green-600">Sign Up</button>
            </div>
          </div>
        )}
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300">
          <div
            className="bg-white w-full max-w-md p-8 rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out"
            style={{
              animation: 'modalAppear 0.3s ease-out',
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Registration
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleUserSignUp}
                className="w-full px-6 py-3 rounded-md text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                User Sign Up
              </button>
              <button
                onClick={handleProviderSignUp}
                className="w-full px-6 py-3 rounded-md text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              >
                Join as Provider
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      )}

      <style>{`
          @keyframes modalAppear {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
    </>
  );
}