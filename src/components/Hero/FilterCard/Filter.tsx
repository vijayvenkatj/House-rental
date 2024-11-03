"use client";
import { fail } from "@/DBfunctions/Toasts";
import axios from "axios";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";



interface FilterCardProps {

  properties: any[];

  setFilteredProperties: Dispatch<SetStateAction<any[]>>;

}

const FilterCard = ({ properties, setFilteredProperties }: FilterCardProps) => {
  const [price, setPrice] = useState(25000);
  const [location, setLocation] = useState("");
  const [area, setArea] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);

  const handleApply = async () => {

    const filtered = await axios.post("/api/filteredproperty", {
      price,
      location,
      area,
      bedrooms,
    })
    if(filtered.data.length === 0){
      fail("No properties found for the given filter");
    }
    console.log(filtered.data);
    setFilteredProperties(filtered.data);
    
  }

  return (
    <div className="min-h-[85vh] bg-white text-gray-800 rounded-lg p-6 shadow-lg w-full">
      <h1 className="font-bold text-2xl mb-10 text-gray-700">Filter Properties</h1>

      {/* Location */}
      <div className="mb-8">
        <label className="block font-medium text-gray-600 mb-2" htmlFor="location">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          placeholder="Enter location"
        />
      </div>

      {/* Price Slider */}
      <div className="mb-8">
        <label className="block font-medium text-gray-600 mb-2" htmlFor="price">
          Price: &le; Rs.{price}
        </label>
        <input
          type="range"
          id="price"
          min="0"
          max="50000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Area */}
      <div className="mb-8">
        <label className="block font-medium text-gray-600 mb-2" htmlFor="area">
          &ge; Area (sq ft)
        </label>
        <input
          type="number"
          id="area"
          value={area}
          onChange={(e) => setArea(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          placeholder="Enter area"
        />
      </div>

      {/* Bedrooms */}
      <div className="mb-8">
        <label className="block font-medium text-gray-600 mb-2" htmlFor="bedrooms">
          &ge; Bedrooms
        </label>
        <input
          type="number"
          id="bedrooms"
          value={bedrooms}
          onChange={(e) => setBedrooms(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          placeholder="Enter number of bedrooms"
        />
      </div>

      <button
        onClick={handleApply}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterCard;
