import React, { useState } from 'react';
import axios from 'axios';
import { success,fail } from '@/DBfunctions/Toasts';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [Phone_no, setPhone_no] = useState('');
  const [ID_proof, setID_proof] = useState('');

  async function handleSignup(event: any) {
    event.preventDefault();
    try {
      const res = await axios.post('/api/adminsignup', {
        Name, Password, Phone_no, ID_proof
      });
      success("Signup successful!");
      window.location.href = res.request.responseURL;
    } catch (error) {
      console.error("Signup failed", error);
    }
  }
  async function handleSignin(event: any) {
    event.preventDefault();
    try {
      const res = await axios.post('/api/adminlogin', {
        Name, Password
      });
      console.log(res)
      if(res.data=="Invalid email or password"){
        fail("Login failed!")
      }
      else{
        success("Login successful!");
        window.location.href = res.request.responseURL;
      }
      
    } catch (error) {
      console.error("Signup failed", error);
    }
  }

  return (
    <div className="h-auto w-auto rounded-2xl flex items-center justify-center bg-white">
      <div className="bg-white p-10 rounded-2xl w-96">
        <h2 className="text-3xl text-gray-800 mb-6 text-center">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h2>

        {/* Sign In Form */}
        {isSignIn ? (
          <form onSubmit={handleSignin}>
            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="email">
                Name
              </label>
              <input
                type="text"
                id="email"
                onChange={(e) => setName(e.target.value)}
                className="text-gray-800 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="text-gray-800 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-md mt-4"
            >
              Sign In
            </button>

            <p className="mt-4 text-gray-600 text-center">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-blue-600 font-semibold"
                onClick={() => setIsSignIn(false)}
              >
                Sign Up
              </button>
            </p>
          </form>
        ) : (
          /* Sign Up Form */
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="text-gray-800 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-gray-800 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Create a password"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={Phone_no}
                maxLength={10}
                onChange={(e) => setPhone_no(e.target.value)}
                className="text-gray-800 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your 10-digit phone number"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="idProof">
                ID Proof
              </label>
              <input
                type="text"
                id="idProof"
                value={ID_proof}
                onChange={(e) => setID_proof(e.target.value)}
                className="w-full text-gray-800 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your ID proof (e.g., passport)"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-md mt-4"
            >
              Sign Up
            </button>

            <p className="mt-4 text-gray-600 text-center">
              Already have an account?{' '}
              <button
                type="button"
                className="text-blue-600 font-semibold"
                onClick={() => setIsSignIn(true)}
              >
                Sign In
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
