'use client';

import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { User, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function UserSignIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { loginUser } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ username: formData.username, password: formData.password });
      alert("User signed in successfully");
      router.push("/explore");
    } catch (error) {
      alert("Error signing in: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-400" size={24} />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 text-lg rounded-full border-2 border-gray-300 focus:border-purple-500 focus:outline-none transition duration-300 text-black"
              />
            </div>
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={24} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 text-lg rounded-full border-2 border-gray-300 focus:border-purple-500 focus:outline-none transition duration-300 text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-lg font-semibold py-4 rounded-full hover:from-purple-600 hover:to-indigo-600 transition duration-300 flex items-center justify-center group"
            >
              Sign In
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition duration-300" size={24} />
            </button>
          </form>
          <div className="text-center">
            <Link href="/auth/user-signup" className="text-purple-600 hover:text-purple-800 transition duration-300">Create new Account?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}