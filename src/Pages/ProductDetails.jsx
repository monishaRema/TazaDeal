import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery, useMutation} from "@tanstack/react-query";
import { format } from "date-fns";
import ShowToast from "../Components/UI/ShowToast";

import LoadingSpinner from "../Components/UI/LoadingSpinner";
import ShowComparison from "../Components/Product/ShowComparison";
import Review from "../Components/Reviews/Review";
import PaymentModal from "../Components/Modals/PaymentModal";
import useUserData from "../Hooks/useUserData";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
const {userInfo} = useUserData()
const {role} = userInfo
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/public/product/${id}`);
      
      return data;
    },
  });

  const { mutate: addToWatchlist } = useMutation({
    mutationFn: async () => await axiosSecure.post("/public/watchlist", { productId: id }),
    onSuccess: () => ShowToast("success", "Added to watchlist"),
    onError: () => ShowToast("error", "Already in watchlist or failed"),
  });

  if (isLoading) return <LoadingSpinner />;

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
                disabled={role == "admin" || role == "vendor"}
              >
                Add to Watchlist
              </button>
          {role !== "admin" && role !== "vendor" && (
            <>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="btn btn-sm btn-primary mt-3"
              >
                Buy Product
              </button>
            </>
          )}
        </div>
      </div>

      <Review reviews={product.reviews} productId={product._id} />
      <ShowComparison productId={product._id} />

      {showPaymentModal && (
        <PaymentModal
          closeModal={() => setShowPaymentModal(false)}
          productId={product._id}
          buyerId={user?.email}
        />
      )}
    </div>
  );
};

export default ProductDetails;
