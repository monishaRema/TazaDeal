import React, { useState} from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { loadStripe } from "@stripe/stripe-js";
import { Elements} from "@stripe/react-stripe-js";

import ShowToast from "../Components/UI/ShowToast";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import ShowComparison from "../Components/Product/ShowComparison";
import Review from "../Components/Reviews/Review";
import useUserData from "../Hooks/useUserData";
import useAxiosSecure from "../Hooks/useAxiosSecure";
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
    mutationFn: async () => await axiosSecure.post("/users/watchlist", { productId: id }),
    onSuccess: () => ShowToast("success", "Added to watchlist"),
    onError: () => ShowToast("error", "Already in watchlist or failed"),
  });

  if (isLoading) return <LoadingSpinner />;
  if (!product) return <p className="text-center mt-10 text-red-500">Product not found.</p>;

  return (
    <div className="container mx-auto px-5 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product?.image} className="w-full md:w-1/2 rounded-lg" alt={product.name} />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2 text-primary">{product.name}</h2>
          <p><strong>Market:</strong> {product.marketName}</p>
          <p><strong>Date:</strong> {format(new Date(product.date), "dd MMM yyyy")}</p>
          <p><strong>Vendor:</strong> {product.vendorName}</p>
          <p><strong>Price:</strong> ৳{product.priceUnit}</p>

          <button
            onClick={() => addToWatchlist()}
            className="btn btn-sm btn-outline mt-3 mr-3"
            disabled={role === "admin" || role === "vendor"}
          >
            Add to Watchlist
          </button>
          {role !== "admin" && role !== "vendor" && (
            <button
              onClick={() => setShowPaymentModal(true)}
              className="btn btn-sm btn-primary mt-3"
            >
              Buy Product
            </button>
          )}
        </div>
      </div>

      <Review reviews={product.reviews} productId={product._id} />
      <ShowComparison productId={product._id} prices={product.prices} />

      {showPaymentModal && (
        <div className="fixed inset-0 bg-primary/20 flex justify-center items-center z-50 backdrop-blur-xs">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
