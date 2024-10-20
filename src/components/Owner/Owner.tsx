import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OwnerProperty from '../Hero/PropertyCard/OwnerProperty';

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    property_name: '',
    address: '',
    rent: '',
    area: '',
    bedrooms: '',
    description: '',
    image: '',
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProperty = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('/api/addproperty', formData);
      setFormData({
        property_name: '',
        address: '',
        rent: '',
        area: '',
        bedrooms: '',
        description: '',
        image: '',
      });
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('/api/ownerproperty');
        setProperties(res.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="flex w-full h-screen p-4 bg-[#005ca8]">
      {/* Left section: Add Property form */}
      <div className="w-2/5 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl">
        <h2 className="text-gray-700 text-2xl font-bold mt-10 mb-10 text-center">Add Property</h2>
        <form onSubmit={handleAddProperty} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Property Name:</label>
            <input
              type="text"
              name="property_name"
              value={formData.property_name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Rent (Rs):</label>
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Area (sqft):</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Bedrooms:</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Image URL:</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white  rounded-lg transition duration-200"
          >
            Add Property
          </button>
        </form>
      </div>

      {/* Right section: List of properties */}
      <div className="w-3/5 pl-6">
        <h2 className="text-white text-2xl font-bold mb-4">Listed Properties</h2>
        <div className="overflow-y-auto max-h-[calc(100vh-2rem)] pr-4">
          {properties.length === 0 ? (
            <p>No properties listed yet.</p>
          ) : (
            properties.map((property: any, index: number) => (
              <OwnerProperty
                key={index}
                name={property.property_name}
                image={property.image}
                location={property.address}
                price={property.rent}
                area={property.area}
                bedrooms={property.bedrooms}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
