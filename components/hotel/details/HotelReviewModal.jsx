"use client";

import Image from "next/image";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function HotelReviewModal({
  reviews,
  hotelId,
  userId,
  hasReviewed,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  console.log(hasReviewed);

  const handleSubmitReview = async () => {
    if (!newReview || rating === 0) {
      setError("Please provide both a rating and a review.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const reviewData = {
      hotelId,
      userId,
      rating,
      review: newReview,
    };

    try {
      const response = await fetch("/api/auth/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear form and close modal after successful submission
        setNewReview("");
        setRating(0);
        setIsOpen(false);

        // Reload the page to fetch latest reviews
        window.location.reload();
      } else {
        throw new Error(
          data.error || "Something went wrong while submitting the review."
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to render stars for display and input
  const renderStars = (rating, isInput = false) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            onClick={() => isInput && setRating(i + 1)} // Clickable only for input
            className={`cursor-pointer ${
              i < rating ? "text-yellow-500" : "text-gray-300"
            } ${isInput ? "hover:scale-110 transition-transform" : ""}`}
          >
            {i < rating ? (
              <AiFillStar size={isInput ? 50 : 20} />
            ) : (
              <AiOutlineStar size={isInput ? 50 : 20} />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="underline text-gray-800 hover:text-gray-950"
      >
        {reviews?.length === 0
          ? "Be the First to Review!"
          : `${reviews.length} Reviews`}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[50rem] p-6 rounded-lg shadow-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-bold">Hotel Reviews</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-red-500 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Conditionally Render Review Input or "Already Reviewed" Message */}
            {hasReviewed ? (
              <div className="mb-4 text-gray-600">
                <p className="font-medium">
                  You have already reviewed this hotel.
                </p>
              </div>
            ) : (
              <div className="mb-4">
                {/* Input Box for New Review */}
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full p-2 border rounded-md shadow-sm"
                  rows="3"
                />
                {/* Large Star Rating Input */}
                <div className="mt-3 flex justify-center">
                  {renderStars(rating, true)}
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button
                  onClick={handleSubmitReview}
                  className="mt-2 btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            )}

            {/* Title for Reviews */}
            <h3 className="text-lg font-semibold mb-4">All Reviews</h3>

            {/* Reviews List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="p-3 border rounded-md shadow-sm">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 mb-2">
                      {/* User Image */}
                      <div className="relative h-12 w-12 rounded-full bg-orange-600 grid place-items-center text-white text-lg font-bold">
                        {review.reviewByUser?.image ? (
                          <Image
                            src={review.reviewByUser?.image}
                            alt={review.reviewByUser?.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          review.reviewByUser?.name
                            ?.substring(0, 2)
                            ?.toUpperCase() || "U"
                        )}
                      </div>
                      {/* User Name & Email */}
                      <div>
                        <span className="font-semibold text-gray-800">
                          {review.reviewByUser?.name || "Unknown User"}
                        </span>
                        <p className="text-gray-500 text-sm">
                          {review.reviewByUser?.email}
                        </p>
                      </div>
                    </div>

                    {/* Smaller Star Rating Display */}
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800">Rating:</span>
                      {review.rating ? renderStars(review.rating) : "No Rating"}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-800 mt-2">{review.review}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No reviews yet. Be the first to leave one!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
