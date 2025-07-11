import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

import useUserData from '../../Hooks/useUserData';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Review = ({ reviews, productId }) => {
  const { user } = useAuth();
  const { userInfo } = useUserData();
  const axiosSecure = useAxiosSecure()

  const isEligibleRole = userInfo.role === 'user';

  const { data: eligibility, isLoading } = useQuery({
    queryKey: ['reviewEligibility', user?.email, productId],
    enabled: !!user?.email && isEligibleRole,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/public/review-eligibility?email=${user.email}&productId=${productId}`
      );
      return data;
    },
  });

  if (!isEligibleRole) {
    return (
      <div>
        <ReviewsList productId={productId} reviews={reviews} />
      </div>
    );
  }

  if (isLoading) return <p>Checking review eligibility...</p>;

  return (
    <div className="mt-10">
      <ReviewsList productId={productId} reviews={reviews} />
      {eligibility?.canReview ? (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-3">Submit Review</h3>
          <ReviewForm productId={productId} />
        </div>
      ): <p className='p-5 rounded-md bg-white'>Buy the product to share your review to this product.</p>
    }
    </div>
  );
};

export default Review;
