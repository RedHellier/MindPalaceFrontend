'use client';

import React, { useState } from "react";
import Link from "next/link"; 
import { supabase } from "../supabaseClient"
import { useRouter } from "next/navigation";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export default function LoginForm () {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(email: string, password: string) : Promise<void>
      {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
  
        if (error) {
          console.error("Login failed:", error.message);
          alert("Login failed: " + error.message);
          return;
        }
      
        if (data.session) {
          console.log("Login successful. Session:", data.session);
  
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
          if (sessionError || !sessionData?.session) {
            console.log('User not signed in or session is invalid');
            return; // Or redirect the user to login
          }
  
           router.push("/topics");
  
        } else {
          console.warn("Login succeeded but no session returned.");
        }
      }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    handleLogin(email, password);
  };

  return (
   <div className="flex items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">

    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-700">Login</h2>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 text-sm text-blue-500 hover:underline focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-200"
      >
        Sign In
      </button>

      <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
                Create one
            </Link>
      </div>


    </form>
    </div>
  );
};
