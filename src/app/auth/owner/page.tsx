"use client"
import AuthPage from "@/components/Auth/Owner";
import Navbar from "@/components/Navbar/Navbar";
export default function Home() {
  return (
    <>
    <Navbar />
    <div className="relative bg-[#005ca8] text-gray-100 min-h-screen flex items-center justify-center overflow-hidden">
      <AuthPage />
    </div>
    </>
  );
}