import axios from "axios";
import { useState } from "react";
import { fail } from "@/DBfunctions/Toasts";
import Image from "next/image";

const OwnerProperty = ({ name, image, location, price, area, bedrooms, propertyId }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [buyerDetails, setBuyerDetails] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  const handleBuyerDetails = async () => {
    try {
      fetchReviews();
      const res = await axios.get("/api/buyerdetails");
      if (res.data === "Authorization denied") {
        fail("Login first");
      } else {
        const uniqueBuyers: any = Array.from(new Set(res.data.map((buyer: any) => buyer.phone_no)))
          .map(phoneNo => res.data.find((buyer: any) => buyer.phone_no === phoneNo));

        setBuyerDetails(uniqueBuyers);
        setShowModal(true);
      }
    } catch (error) {
      fail("Error fetching buyer details");
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.post("/api/getreview", { propertyId });
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBuyerDetails([]);
  };

  return (
    <div>
      <div className="bg-white rounded-lg flex p-4 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div className="w-3/5">
          <Image src={image} alt="Property" width={800} height={500} className="rounded-lg w-full h-full object-cover" />
        </div>

        <div className="w-2/5 pl-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl text-gray-800 font-semibold">{name}</h3>
            <p className="text-lg text-gray-600">{location}</p>
          </div>

          <div className="mt-1">
            <p className="text-xl mb-2 font-semibold text-blue-700">Rs.{price}/month</p>
            <p className="text-md text-gray-600">{area} sqft</p>
            <p className="text-md text-gray-600">{bedrooms} BHK</p>
          </div>

          <div className="flex gap-4 items-center mt-2">
            <button
              onClick={handleBuyerDetails}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition duration-200 ease-in-out"
            >
              Buyer Details
            </button>
          </div>
        </div>
      </div>

      {/* Modal for displaying buyer details and reviews */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-1/3 relative transition-transform transform duration-300 ease-in-out">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Buyer Details</h2>
            
            {buyerDetails.length > 0 ? (
              <div>
                {buyerDetails.map((buyer, index) => (
                  <div key={index} className="mb-4 border-b pb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{buyer.name}</h3>
                    <p className="text-md text-gray-600">Phone No: <span className="font-medium">{buyer.phone_no}</span></p>
                    <p className="text-md text-gray-600">Marital Status: <span className="font-medium">{buyer.marital_status}</span></p>
                    <p className="text-md text-gray-600">Family Size: <span className="font-medium">{buyer.family_size}</span></p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No buyer details available.</p>
            )}

            <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center mt-6">User Reviews</h2>
            {reviews.length > 0 ? (
              <div>
                {reviews.map((review, index) => (
                  <div key={index} className="mb-4 border-b pb-4">
                    <h3 className="text-md font-semibold text-gray-800">Rating: {review.rating} / 5</h3>
                    <p className="text-md text-gray-600">{review.review_text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No reviews available for this property.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerProperty;
