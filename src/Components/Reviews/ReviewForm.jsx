import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaStar } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import ShowToast from '../UI/ShowToast';
import useUserData from '../../Hooks/useUserData';

const ReviewForm = ({ productId }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const selectedRating = watch('rating');
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {userInfo} = useUserData()

  const { mutate: submitReview, isLoading } = useMutation({
    mutationFn: async (reviewData) => {
     return await axiosSecure.post('/users/reviews', reviewData);
    },
    onSuccess: () => {
      ShowToast('success', 'Review submitted successfully');
      reset();
      queryClient.invalidateQueries(['productReviews', productId]);
    },
    onError: () => {
      ShowToast('error', 'Failed to submit review');
    },
  });

const onSubmit = (data) => {
  const payload = {
    productId,
    rating: parseInt(data.rating),
    comment: data.comment.trim(),
    userEmail: userInfo?.email,
    userName: userInfo?.name,
    userPhoto: userInfo?.photoURL || "",
  };
  submitReview(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium text-sm">Star Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar
              key={num}
              className={`text-2xl cursor-pointer transition-colors duration-200 ${
                num <= selectedRating ? 'text-accent' : 'text-gray-300'
              }`}
              onClick={() => setValue('rating', num, { shouldValidate: true })}
            />
          ))}
        </div>
        <input
          type="hidden"
          {...register('rating', { required: true })}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Comment</label>
        <textarea
          {...register('comment', { required: true })}
          placeholder="Write your feedback..."
          className="textarea textarea-bordered w-full min-h-[100px] border-accent/30 focus:outline-0 focus:border-accent"
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
