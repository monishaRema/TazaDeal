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
          className="object-contain max-h-full"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <p className="text-sm text-green-600 font-semibold mb-1">
            {product.category}
          </p>

          <h2 className="text-lg font-bold text-gray-800 mb-1">
            {product.itemName}
          </h2>

          <p className="text-sm text-gray-500 mb-2">
            <span className="font-medium text-gray-700">Market:</span>{" "}
            {product.marketName}
          </p>

          <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
            <FaUserTie /> {product.vendorName}
          </p>

          <p className="text-sm text-gray-500 mb-4">
            <span className="font-medium text-gray-700">Date:</span>{" "}
            {format(new Date(product.date), "dd MMM yyyy")}
          </p>
        </div>

        {/* Price + Button */}
        <div className="mt-auto flex justify-between items-center">
          <span className="text-lg font-bold text-primary">
            ${product.priceUnit.toFixed(2)}
          </span>
          <button
            onClick={handleViewDetails}
            className="btn btn-sm btn-outline text-primary border-primary flex items-center gap-1"
          >
            <HiOutlineEye /> View
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
