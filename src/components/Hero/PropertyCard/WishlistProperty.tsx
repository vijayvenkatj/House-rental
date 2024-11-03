import axios from "axios";
import { useState } from "react";
import { fail } from "@/DBfunctions/Toasts"; 
import Image from "next/image";

interface Owner {
  name: string;
  phone_no: string;
}

const WishlistProperty = ({ name, image, location, price, area, bedrooms }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState<Owner | null>(null); 

  const handleDelete = async () => {
    try {
      const res = await axios.post("/api/removewishlist", {
        image: image,
      });
      if (res.data) {
        window.location.reload();
      }
      else {
        fail("Error removing property from wishlist");
      }
    } catch (error) {
      fail("Error removing property from wishlist");
      console.error(error);
    }
  }
  const handleOwnerDetails = async () => {
    try {
      const res = await axios.post("/api/ownerdetails",{
        image: image,
      });
      console.log(image);
      console.log(res.data);
      if (res.data) {
        setOwnerDetails({
          name: res.data.Name,
          phone_no: res.data.Phone_Number,
        });
        setShowModal(true);
      } 
      else {
        fail("Owner details not found");
      }
    } catch (error) {
      fail("Error fetching owner details");
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setOwnerDetails(null);
  };

  return (
    <div>
      <div className="bg-white rounded-lg flex p-4 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div className="w-1/2">
          <Image
            src={image}
            alt="Property"
            width={800}
            height={500}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>

        <div className="w-1/2 pl-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl text-gray-800 font-semibold">{name}</h3>
            <p className="text-lg text-gray-600">{location}</p>
          </div>

          <div className="mt-1">
            <p className="text-xl mb-2 font-semibold text-blue-700">
              Rs. {price}/month
            </p>
            <p className="text-md text-gray-600">{area} sqft</p>
            <p className="text-md text-gray-600">{bedrooms} BHK</p>
          </div>

          <div className="flex justify-between mt-2 mx-5">
            <button
              onClick={handleOwnerDetails}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition duration-200 ease-in-out"
            >
              Owner Details
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-sm text-white px-6 py-3 rounded-md transition duration-200 ease-in-out"
            >
              Remove from Wishlist
            </button>
          </div>
        </div>
      </div>

      {showModal && ownerDetails && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-11/12 md:w-1/3 relative transition-transform transform duration-300 ease-in-out">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">
              Owner Details
            </h2>

            <div className="mb-4 pb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {ownerDetails.name}
              </h3>
              <p className="text-md text-gray-600">
                Phone No: {" "}
                <span className="font-medium">{ownerDetails.phone_no}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistProperty;
