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
     <div className="mt-6 bg-white p-5 md:p-8 rounded-md shadow-sm">
          <h2 className="sub-heading mb-3 text-primary">Submit Review</h2>
      {isEligibleRole && !hasAlreadyReviewed ? (
   <>
          <p className="text-sm text-gray-600 mb-10">
            Share your feedback on market price — whether you think it's too high, fair, or recently changed drastically.
          </p>
          <ReviewForm productId={productId} />
      </>
      ) : isEligibleRole && hasAlreadyReviewed ? (
        <p className=" text-gray-700">
          ✅ You’ve already submitted a review for this product.
        </p>
      ) : (
        <p className="text-gray-700">
          Only buyers can post a review. You cannot submit a review as a <strong>{userInfo.role}</strong>.
        </p>
      )}
        </div>
    </div>
  );
};

export default Review;