'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// The root page which is the site that is displays when no sites e.i. /categories are entered in the url
// The root page shows the login screen for now

/* --- TODO --- 
Add actual login logic (API request for authentication), right now the user is not authenticated. */

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      // TODO: Add actual login logic here (API request for authentication)
      const isAuthenticated = true; // Replace with real authentication logic
  
      if (isAuthenticated) {
        router.push('/superadmin'); // Navigate to the SuperAdmin dashboard
      } else {
        alert('Invalid credentials'); // Show error if authentication fails
      }
    };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-custom-blue to-gradient"> {/* Uses the custom colors (tailwind.config.js) to create gradient */}
      <div className="flex flex-col items-center space-y-6">
        {/* Logo Section */}
        <div className="text-center">
          <Image
            src="/main-logo.svg"
            alt="FriGo Logo"
            width={140}
            height={140}
            priority
          />
          <p className="text-blue-200">By Pentia</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-[350px]">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Log in</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your email and password to log in.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="johndoe@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Password Field */}
            <div>
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Adgangskode
                </label>
                <a
                href="/forgot-password"
                className="text-sm text-gray-500 hover:underline"
                >
                Forgot password?
                </a>
                </div>
                <input
                type="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 text-sm font-medium text-white bg-custom-blue rounded-lg shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
