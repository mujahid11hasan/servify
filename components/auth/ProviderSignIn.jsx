'use client';

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { useRouter } from 'next/navigation'

export default function ProviderSignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loginProvider } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if email and password are not empty
    if (!formData.email || !formData.password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      // Pass email and password to loginProvider
      await loginProvider({ email: formData.email, password: formData.password });
      alert("Service Provider signed in successfully");
      router.push('/provider-dashboard');
    } catch (error) {
      alert("Error signing in: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Provider Sign In</h1>
          <div className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm">
          Don't have an account? <Link href="/auth/provider-signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
