import React from 'react';
import useUserData from '../../Hooks/useUserData';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';

const Review = ({ reviews, productId }) => {
  const { userInfo } = useUserData();
  const isEligibleRole = userInfo.role === 'user';

//  check already reviewed or not
  const hasAlreadyReviewed = reviews?.some(
    (review) => review.userEmail === userInfo.email
  );

  return (
    <div className="mt-10">
      {reviews.length > 0 && (
        <ReviewsList productId={productId} reviews={reviews} />
      )}

      {isEligibleRole && !hasAlreadyReviewed ? (
        <div className="mt-6 bg-white p-5 md:p-8 rounded-md shadow-sm">
          <h2 className="sub-heading mb-1">Submit Review</h2>
          <p className="text-sm text-gray-600 mb-10">
            Share your feedback on market price — whether you think it's too high, fair, or recently changed drastically.
          </p>
          <ReviewForm productId={productId} />
        </div>
      ) : isEligibleRole && hasAlreadyReviewed ? (
        <p className="p-5 mt-4 rounded-md bg-white text-gray-700 shadow-sm">
          ✅ You’ve already submitted a review for this product.
        </p>
      ) : (
        <p className="p-5 mt-4 rounded-md bg-white text-gray-700 shadow-sm">
          Only buyers can post a review. You cannot submit a review as a <strong>{userInfo.role}</strong>.
        </p>
      )}
    </div>
  );
};

export default Review;