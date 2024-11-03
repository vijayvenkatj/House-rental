"use client";
import FilterCard from "@/components/Hero/FilterCard/Filter";
import Property from "@/components/Hero/PropertyCard/Property";
import Navbar from "@/components/Navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);

  useEffect(() => {
    const GetProperties = async () => {
      try {
        const res = await axios.get("/api/allproperty");
        setProperties(res.data);
        setFilteredProperties(res.data);
      } catch (error) {
        console.error("Error getting all properties:", error);
      }
    };
    GetProperties();
  }, []);

  return (
    <>
    <Navbar properties={properties} setFilteredProperties={setFilteredProperties} />
    <div className="relative bg-[#005ca8] text-gray-100 min-h-screen flex items-center justify-center overflow-hidden px-5">
      <div className="container mx-auto grid grid-cols-7 gap-4 p-8">
        <div className="col-span-2">
          <div className="sticky top-0">
            <FilterCard 
              properties={properties} 
              setFilteredProperties={setFilteredProperties}
            />
          </div>
        </div>
        
        <div className="col-span-5 max-h-screen rounded-md overflow-y-auto">
          <div className="grid grid-cols-1 gap-6">
            {filteredProperties.map((property: propertyInterface, index: number) => (
              <Property 
                key={index}
                name={property.property_name}
                image={property.image}
                location={property.address}
                price={property.rent}
                area={property.area}
                bedrooms={property.bedrooms}
              />
            ))}
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

