import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserTie,
  FaTag,
  FaStar,
  FaRegClock,
  FaInfoCircle,
  FaShoppingCart,
} from "react-icons/fa";

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

  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery({
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
  if (!product)
    return <p className="text-center mt-10 text-red-500">Product not found.</p>;
  console.log(product);
  return (
    <div className="container mx-auto px-5 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Product Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={product?.image}
            alt={product.itemName}
            className="w-full object-cover max-h-[500px]"
          />
        </div>

        {/* Right: Product Info */}
        <div className="">
          <p className="text-accent flex items-baseline gap-2 ">
            <FaTag className="text-base"  />{product.category}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-1">
            {product.itemName}
          </h2>

          {/* Star rating */}
          <div className="flex items-center gap-2 text-accent mb-5">
            {[...Array(5)].map((_, idx) => (
              <FaStar key={idx} />
            ))}
            <span className="text-sm text-gray-600 ml-2">
              ({product.reviews?.length || 0}{product.reviews?.length > 1 ?" reviews": " review"})
            </span>
          </div>

          <div className="text-2xl md-text-3xl font-bold text-primary">
            ৳{product.priceUnit}
          </div>
<div className="product-meta mt-5">
          <p className="text-gray-600 flex items-baseline gap-2">
            <FaCalendarAlt className="text-primary text-base"  />
            {format(new Date(product.date), "dd MMM yyyy")}
          </p>

          <p className="text-gray-600 flex items-baseline gap-2">
            <FaShoppingCart className="text-primary text-base"  /> {product.marketName}
          </p>

          <p className="text-gray-600 flex items-baseline gap-2">
            <FaUserTie className="text-primary text-base"  /> {product.vendorName}
          </p>
</div>
            <div className="price-history my-5">
          <h4 className="mb-3 text-2xl md:text-3xl font-semibold text-primary flex items-baseline gap-2">
            Price History
          </h4>

          {product?.prices?.map((price, idx) => (
            <div key={idx} className="text-gray-600 flex items-baseline gap-2 mb-2">
              <FaCalendarAlt className="text-base text-primary"/>
              <p>
                Date:{" "}
                <span>{format(new Date(price.date), "dd MMM yyyy")}</span> {" | "}
                Price: <span>৳{price.price}</span>
              </p>
            </div>
          ))}
</div>
          <div className="text-gray-600 flex flex-col items-start gap-1 mt-2">
            <p className="flex gap-2 items-baseline text-primary">
              <FaInfoCircle className="text-lg" />
            <span className="font-semibold text-lg">Short Description</span></p>
            <p>
              {product.itemDescription?.length > 100
              ? product.itemDescription.slice(0, 100) + "..."
              : product.itemDescription}
            </p>
            
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => addToWatchlist()}
              className="btn btn-outline btn-accent hover:text-white"
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

      <div className="bg-white rounded-2xl p-5 mt-10">
        <h3 className="text-primary sub-heading mb-2">Product Description</h3>
        <p>{product.itemDescription}</p>
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
