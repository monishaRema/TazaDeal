import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FaAngleLeft, FaAngleRight, FaStar } from 'react-icons/fa';

const ReviewsList = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="space-y-6 bg-white rounded-md p-5 md:p-8">
      {reviews?.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <>
        <h2 className='sub-heading mb-5'>Review list</h2>
          {currentReviews.map((review) => (
            <div
              key={review._id}
              className="border-b-2 border-accent/10 p-2 pb-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={review.userPhoto || '/default-avatar.png'}
                    alt={review.userName || 'User'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {review.userName || 'Anonymous'}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>

              <div className="mt-2">
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating ? 'text-accent' : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {review.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline"
            >
              <FaAngleLeft></FaAngleLeft>
            </button>
            <span className="text-sm text-gray-600 mt-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline"
            >
             <FaAngleRight></FaAngleRight>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewsList;