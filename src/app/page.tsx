"use client"
import Property from "@/components/Hero/PropertyCard/Property";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const GetProperties = async () => {
    try {
      const res = await axios.get("/api/allproperty");
      setProperties(res.data);
    } catch (error) {
      console.error("Error getting all properties:", error);
    }
  }
  useEffect(() => {
    GetProperties();
  }, []);

  return (
    <div className="relative bg-[#005ca8] text-gray-100 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto grid grid-cols-5 gap-4 p-8">
        <div className="col-span-2 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Dream Home</h1>
            <p className="text-lg">Browse through our listings to find the perfect place for you.</p>
          </div>
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-1 gap-6">
            {properties.map((property: propertyInterface, index: number) => (
              <Property 
              key={index}
              image={property.image}
              location={property.address}
              price={property.rent}
              area={property.area}
              bedrooms={property.bedrooms}
              description={property.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
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
