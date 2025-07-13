import { Link, useNavigate } from "react-router";

import { format } from "date-fns";
import { FaUserTie, FaStore } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";

const SingleProduct = ({ product }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (!user) {
      navigate("/auth/login");
    } else {
      navigate(`/product-details/${product._id}`);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all relative flex flex-col">
      {/* Image */}
      <div className="w-full h-40 overflow-hidden flex justify-center items-center mb-3">
        <img
          src={product.image}
          alt={product.itemName}
          className="object-cover w-full max-h-full"
        />
      </div>
      <span className="text-sm font-semibold absolute top-4 capitalize left-4 bg-primary text-white px-5 py-3 inline-block rounded-md rounded-br-3xl rounded-tr-3xl">
            {product.category}
      </span>

      {/* Content */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="border-b border-accent/20 mb-5">
          

          <h3 className="card-heading text-primary mb-1">
            {product.itemName}
          </h3>

          <p className="text-base text-gray-500 mb-2">
            <span className="font-medium text-gray-700">Market:</span>{" "}
            {product.marketName}
          </p>

          <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
             <span className="font-medium text-gray-700">Vendor:</span>{product.vendorName}
          </p>

          <p className="text-sm text-gray-500 mb-4">
            <span className="font-medium text-gray-700">Date:</span>{" "}
            {format(new Date(product.date), "dd MMM yyyy")}
          </p>
        </div>

        {/* Price + Button */}
        <div className="mt-auto flex justify-between items-center">
          <span className="text-base md:text-lg font-bold text-accent">
            ৳{product.priceUnit.toFixed(2)}
          </span>
          <button
            onClick={handleViewDetails}
            className="btn btn-sm btn-outline btn-primary"
          >
            <HiOutlineEye /> View
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
