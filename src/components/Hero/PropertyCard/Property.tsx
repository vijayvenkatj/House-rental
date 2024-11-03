import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import { fail, success } from '@/DBfunctions/Toasts';

const Property = ({ name, image, location, price, area, bedrooms }: any) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleAddtoWishlist = async () => {
    const res = await axios.post("/api/addwishlist", { image });
    if (res.data == "Authorisation denied") {
      fail("Login first");
    } else {
      success("Added to Wishlist");
    }
  };

  const handleReview = () => {
    setShowReviewModal(true);
  };

  const handleSubmitReview = async () => {
    if (reviewText && rating > 0) {
      try {
        console.log(image, reviewText, rating);
        const res = await axios.post("/api/addreview", {
          image,
          reviewText,
          rating,
        });
        if (res.status === 200) {
          success("Review added successfully");
          setReviewText('');
          setRating(0);
          setShowReviewModal(false);
        }
      } catch (error) {
        fail("Failed to add review");
      }
    } else {
      fail("Please provide both a rating and a review");
    }
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
  };

  const handleRatingClick = (rate: any) => {
    setRating(rate);
  };

  return (
    <div className="bg-gray-200 rounded-lg flex p-2 mb-2">
      <div className="w-3/5">
        <Image src={image} alt="Property" width={200} height={200} className="rounded-lg w-full h-full object-cover" />
      </div>

      <div className="w-2/5 ml-12 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl text-gray-800 font-medium p-auto mt-2">{name}</h3>
          <p className="text-lg text-gray-600 mt-2">{location}</p>
        </div>

        <div className="mt-1">
          <p className="text-xl mb-2 font-semibold text-blue-700">Rs.{price}/month</p>
          <p className="text-md text-gray-600">{area} sqft</p>
          <p className="text-md text-gray-600">{bedrooms} BHK</p>
        </div>

        <div className="flex gap-6 items-center mt-2">
          <div>
            <button onClick={handleAddtoWishlist} className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md my-3">Add to Wishlist</button>
          </div>
          <div className="flex items-center text-gray-700">
            <button onClick={handleReview} className='font-medium'>Write a Review</button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4 text-gray-700">Write a Review</h3>

            {/* Star Rating */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  className={`w-6 h-6 cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-500'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.908c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.978-2.89a1 1 0 00-1.175 0l-3.978 2.89c-.785.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.783-.57-.381-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z" />
                </svg>
              ))}
            </div>

            {/* Review Textarea */}
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-3 border rounded-md mb-4 text-gray-300"
            ></textarea>
            <div className="flex justify-end gap-4">
              <button onClick={handleCloseModal} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
              <button onClick={handleSubmitReview} className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Property;
