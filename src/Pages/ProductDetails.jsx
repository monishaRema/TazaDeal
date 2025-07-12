import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FaStar } from "react-icons/fa";

import useAxiosSecure from "../Hooks/useAxiosSecure";
import useUserData from "../Hooks/useUserData";
import ShowToast from "../Components/UI/ShowToast";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import ShowComparison from "../Components/Product/ShowComparison";
import Review from "../Components/Reviews/Review";
import CheckoutForm from "../Components/Modals/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserData();
  const { role } = userInfo || {};
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { data: product, isLoading, refetch } = useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/public/product/${id}`);
      return data;
    },
    enabled: !!id,
  });

  const { mutate: addToWatchlist } = useMutation({
    mutationFn: async () =>
      await axiosSecure.post("/users/watchlist", { productId: id }),
    onSuccess: () => ShowToast("success", "Added to watchlist"),
    onError: () => ShowToast("error", "Already in watchlist or failed"),
  });

  if (isLoading) return <LoadingSpinner />;
  if (!product) return <p className="text-center mt-10 text-red-500">Product not found.</p>;

  return (
    <div className="container mx-auto px-5 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Product Image */}
        <div className="rounded-lg overflow-hidden">
          <img src={product?.image} alt={product.itemName} className="w-full object-cover" />
        </div>

        {/* Right: Product Info */}
        <div className="space-y-4">
          <p className="text-sm text-green-600 font-medium">Category: {product.category}</p>
          <h2 className="text-3xl font-bold text-primary">{product.itemName}</h2>

          {/* Star rating */}
          <div className="flex items-center gap-2 text-yellow-500">
            {[...Array(5)].map((_, idx) => (
              <FaStar key={idx} />
            ))}
            <span className="text-sm text-gray-600 ml-2">({product.reviews?.length || 0} Reviews)</span>
          </div>

          <div className="text-xl font-bold text-primary">
            ৳{product.priceUnit}
          </div>

          <p className="text-gray-600">
            <strong>Date:</strong> {format(new Date(product.date), "dd MMM yyyy")}
          </p>
          <p className="text-gray-600">
            <strong>Market:</strong> {product.marketName}
          </p>
          <p className="text-gray-600">
            <strong>Vendor:</strong> {product.vendorName}
          </p>
          <p className="text-gray-600">{product.itemDescription}</p>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => addToWatchlist()}
              className="btn btn-outline"
              disabled={role === "admin" || role === "vendor"}
            >
              Add to Watchlist
            </button>

            {role !== "admin" && role !== "vendor" && (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="btn btn-primary"
              >
                Buy Product
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Review and Comparison */}
      <div className="mt-16">
        <Review reviews={product.reviews} productId={product._id} />
      </div>

      <div className="mt-12">
        <ShowComparison productId={product._id} prices={product.prices} />
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                closeModal={() => setShowPaymentModal(false)}
                refetch={refetch}
                orderData={{
                  productId: product._id,
                  buyerId: userInfo?.email,
                  totalPrice: product?.priceUnit,
                }}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
