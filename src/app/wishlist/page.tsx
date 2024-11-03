"use client";
import { useState, useEffect } from "react";
import WishlistProperty from "@/components/Hero/PropertyCard/WishlistProperty";
import axios from "axios";
import Navbar from "@/components/Navbar/Navbar";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<propertyInterface[]>([]);

  const GetWishlist = async () => {
    try {
      const res = await axios.get("/api/buyerwishlist");
      setWishlist(res.data);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };

  useEffect(() => {
    GetWishlist();
  }, []);

  return (
    <>
    <Navbar />
    <div className="relative bg-[#005ca8] text-gray-100 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto grid grid-cols-5 gap-4 p-8">
        <div className="col-span-2 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Your Wishlist</h1>
            <p className="text-lg">Explore your saved properties.</p>
          </div>
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-1 gap-6">
            {wishlist.length > 0 ? (
              wishlist.map((property: propertyInterface, index: number) => (
                <WishlistProperty
                  key={index}
                  name={property.property_name}
                  image={property.image}
                  location={property.address}
                  price={property.rent}
                  area={property.area}
                  bedrooms={property.bedrooms}
                />
              ))
            ) : (
              <p>No items in wishlist yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

interface propertyInterface {
  property_name: string;
  address: string;
  rent: number;
  area: number;
  bedrooms: number;
  description: string;
  image: string;
  Owner_id: number;
}
