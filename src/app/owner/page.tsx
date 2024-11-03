"use client"

import Navbar from "@/components/Navbar/Navbar";
import OwnerDashboard from "@/components/Owner/Owner";
export default function Home() {
  return (
    <>
    <Navbar />
    <div className="relative bg-[#005ca8] text-gray-100 min-h-screen flex items-center justify-center overflow-hidden">
      <OwnerDashboard />
    </div>
    </>
  );
}