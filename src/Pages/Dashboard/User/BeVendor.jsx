import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ShowToast from "../../../Components/UI/ShowToast";

const BeVendor = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.patch(`/users/be-vendor/${user?.email}`);
      return data;
    },
    onSuccess: (data) => {
      if (data?.modifiedCount > 0) {
        ShowToast('success','Vendor request submitted successfully!')
 
        queryClient.invalidateQueries(['userRole']); 
      } else {
         ShowToast('info','You are already a vendor or have requested it.');
      }
    },
    onError: () => {
       ShowToast('error','Failed to submit request. Try again.');
    },
  });

  return (
    <div className="p-5 md:p-10 max-w-md mx-auto bg-white rounded-lg shadow text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Become a Vendor</h2>
      <p className="text-gray-600 mb-6">
        Ready to start selling your products? Apply now to become a vendor on TazaDeal.
      </p>
      <button
        onClick={() => mutate()}
        disabled={isPending || isSuccess}
        className={`w-full py-2 px-4 rounded text-white font-semibold transition
          ${isSuccess ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'}
        `}
      >
        {isSuccess ? 'Request Submitted' : isPending ? 'Submitting...' : 'Apply to Become Vendor'}
      </button>
    </div>
  );
};

export default BeVendor;
