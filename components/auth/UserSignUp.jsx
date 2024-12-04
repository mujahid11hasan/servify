'use client';

import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from "next/link";
import { useRouter } from 'next/navigation'

const UserSignup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUpUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpUser({ username, email, password });
      alert('User signed up successfully');
      router.push('/auth/user-login');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Error signing up');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-12 md:w-1/2 flex flex-col justify-center items-center text-white">
            <h2 className="text-4xl font-bold mb-6">Join Us</h2>
            <p className="text-xl text-center">Embark on a journey of endless possibilities. Sign up today!</p>
          </div>
          <form onSubmit={handleSubmit} className="p-12 md:w-1/2 space-y-8">
            <h3 className="text-3xl font-semibold text-gray-800 mb-8">Create Account</h3>
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-lg rounded-full border-2 border-gray-300 focus:border-purple-500 focus:outline-none transition duration-300 text-black"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" size={24} />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-lg rounded-full border-2 border-gray-300 focus:border-purple-500 focus:outline-none transition duration-300 text-black"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={24} />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-lg rounded-full border-2 border-gray-300 focus:border-purple-500 focus:outline-none transition duration-300 text-black"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-semibold py-4 rounded-full hover:from-purple-600 hover:to-blue-600 transition duration-300 flex items-center justify-center group"
            >
              Sign Up
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition duration-300" size={24} />
            </button>
          </form>
          
        </div>
        
      </div>
      
    </div>
  );
};

export default UserSignup;

