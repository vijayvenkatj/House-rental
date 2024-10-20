"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars as Menu, FaTimes as X, FaSearch } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [buyer, setBuyer] = useState(true);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const buyertoken = document.cookie.split("; ").find(row => row.startsWith("Buyer="));
    const ownertoken = document.cookie.split("; ").find(row => row.startsWith("Owner="));
    if (buyertoken || ownertoken) {
      setIsLoggedIn(true);
    }
    if(window.location.href === "/owner"){
      setBuyer(false);
    }
    else{
      setBuyer(true);
    }
  }, []);

  const handleLogout = async() => {
    if(document.cookie.split("; ").find(row => row.startsWith("Buyer="))){
      await axios.post("/api/logout");
    }
    else if(document.cookie.split("; ").find(row => row.startsWith("Owner="))){
      await axios.post("/api/ownerlogout");
    }
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-[#005ca8] border-b-2 border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white">
              Rental
            </Link>
          </div>

          {/* Center Search Bar */}
          <div className="hidden sm:flex flex-grow justify-center">
            <div className="flex items-center bg-white shadow-md rounded-full p-2 space-x-2 min-w-[450px] max-w-full border-2 border-gray-300 focus-within:border-blue-400">
              <div className="relative">
                <div className="text-blue-700 px-3 py-1 border-none focus:outline-none">
                  Rent
                </div>
              </div>
              <input
                type="text"
                placeholder="Add more"
                className="flex-grow bg-transparent text-gray-600 focus:outline-none"
              />
              <div className="border-l h-6 mx-2"></div>
              <button className="p-2 bg-blue-100 text-blue-500 rounded-full hover:bg-blue-200">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            { buyer ? (
              <Link href="/auth/owner">
              <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-gray-100 hover:bg-gray-200">
                For Property Owners
              </button>
            </Link>
            ):
            (
              <Link href="/auth">
              <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-gray-100 hover:bg-gray-200">
                For Buyers
              </button>
            </Link>
            )
            }
            
            {isloggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 ml-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
            ) : (
              <Link href="/auth">
                <button className="px-4 py-2 ml-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                  Login / Signup
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pt-4 pb-3 space-y-1">
          <input
            type="text"
            placeholder="Search for rentals..."
            className="px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500 mb-3"
          />
          {isloggedIn ? (
            <>
              <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-gray-400">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-gray-400 bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-gray-400">
              Login / Signup
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
