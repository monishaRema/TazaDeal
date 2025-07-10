import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ShowToast from "../../../Components/UI/ShowToast";
import { siteTitle } from '../../../Libs/Utility';
import { Helmet } from '@dr.pogodin/react-helmet';
import useUserData from '../../../Hooks/useUserData';
import LoadingSpinner from '../../../Components/UI/LoadingSpinner';

const BeVendor = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { userInfo, isLoading } = useUserData();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.patch(`/users/be-vendor/${userInfo?.email}`, {
        name: userInfo?.name,
        photoURL: userInfo?.photoURL,
      });
      return data;
    },
    onSuccess: (data) => {
      if (data?.modifiedCount > 0) {
        ShowToast('success', 'Vendor request submitted successfully!');
        queryClient.invalidateQueries(['userData']);
      } else {
        ShowToast('info', 'You have already requested or are already a vendor.');
      }
    },
    onError: () => {
      ShowToast('error', 'Failed to submit request. Try again.');
    },
  });

  // Dynamic status rendering
  const vendorStatus = userInfo?.vendorRequestStatus;
  const rejectionReason = userInfo?.vendorRejectionReason;

  const getButtonLabel = () => {
    if (isPending) return "Submitting...";
    if (vendorStatus === "approved") return "You are a Vendor";
    if (vendorStatus === "pending") return "Request Pending";
    if (vendorStatus === "rejected") return "Request Again";
    return "Apply to Become Vendor";
  };

  const isDisabled =
    isPending || vendorStatus === "pending" || vendorStatus === "approved";

    if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className="p-5 md:p-10 max-w-md mx-auto bg-white rounded-lg shadow text-center">
      <Helmet>
        <title>{siteTitle} | Dashboard: Be Vendor</title>
      </Helmet>

      <h2 className="text-2xl md:text-3xl font-bold mb-4">Become a Vendor</h2>
      <p className="text-gray-600 mb-6">
        Ready to start selling your products? Apply now to become a vendor on TazaDeal.
      </p>
       {vendorStatus === "rejected" && rejectionReason && (<>
        <h3 className='text-red-500 mb-1 text-xl font-semibold'>Application Rejected</h3>
        <p className="text-accent mb-3 text-sm">
          Rejected Reason: {rejectionReason}
        </p>
        </>
      )}

      <button
        onClick={() => mutate()}
        disabled={isDisabled}
        className={`w-full py-2 px-4 rounded text-white font-semibold transition
          ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'}
        `}
      >
        {getButtonLabel()}
      </button>

     
    </div>
  );
};

export default BeVendor;

