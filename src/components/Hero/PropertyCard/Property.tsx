import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import { fail, success } from '@/DBfunctions/Toasts';

const Property = ({ name,image,location,price,area,bedrooms }: any) => {
  const handleAddtoWishlist = async() => {
    const res = await axios.post("/api/addwishlist",{
      image
    });
    console.log(res)
    if(res.data=="Authorisation denied"){
      fail("Login first")
    }
    else{
      success("Added to Wishlist")
    }
  }
  return (
    <div className="bg-gray-200 rounded-lg flex p-2 mb-2">

      <div className="w-1/2">
        <Image src={image} alt="Propery" width={800} height={500} className="rounded-lg w-full h-full object-cover" />
      </div>

      <div className="w-1/2 pl-8 flex flex-col justify-between">
        
        <div>
          <h3 className="text-xl text-gray-800 font-semibold">{name}</h3>
          <p className="text-lg text-gray-600">{location}</p>
        </div>

        <div className="mt-1">
          <p className="text-xl mb-2 font-semibold text-blue-700">Rs.{price}/month</p>
          <p className="text-md text-gray-600">{area} sqft</p>
          <p className="text-md text-gray-600">{bedrooms} BHK</p>
        </div>

        <div className="flex gap-6 items-center mt-2">
          {/* <div>
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md">Contact Owner</button>
          </div> */}
          <div>
            <button onClick={handleAddtoWishlist} className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Property
