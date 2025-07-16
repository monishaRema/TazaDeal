import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { FaUserTie, FaStore } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";

import {
  motionContainerVariants,
  motionCardVariants,
} from "../../Libs/Utility";
import AddWatchList from "../Common/AddWatchList";
import useUserData from "../../Hooks/useUserData";

const SingleProduct = ({ product }) => {
  const { user } = useAuth();
   const { role } = useUserData();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (!user) {
      navigate("/auth/login");
    } else {
      navigate(`/product-details/${product._id}`);
    }
  };

  return (
    <motion.div
      variants={motionContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-xl p-4 relative flex flex-col group overflow-hidden"
    >
      {/* Image */}
      <motion.div
        variants={motionCardVariants}
        className="w-full h-40 overflow-hidden flex justify-center items-center mb-3"
      >
        <img
          src={product.image}
          alt={product.itemName}
          className="object-contain w-full max-h-full scale-100 rotate-0 group-hover:scale-120 group-hover:-rotate-5 transition-all duration-500 ease-in-out"
        />
      </motion.div>
      <motion.span
        variants={motionCardVariants}
        className="text-sm font-semibold absolute top-4 capitalize left-4 bg-primary text-white px-5 py-3 inline-block rounded-md rounded-br-3xl rounded-tr-3xl"
      >
        {product.category}
      </motion.span>
      {user && role == 'user' && (
        <>
          <motion.span
            variants={motionCardVariants}
            className="absolute top-4 right-4"
          >
            <AddWatchList id={product?._id}></AddWatchList>
          </motion.span>
        </>
      )}

      {/* Content */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="border-b border-accent/20 mb-5">
          <motion.h3
            variants={motionCardVariants}
            className="card-heading text-primary mb-1"
          >
            {product.itemName}
          </motion.h3>

          <motion.p
            variants={motionCardVariants}
            className="text-base text-gray-500 mb-2"
          >
            <span className="font-medium text-gray-700">Market:</span>{" "}
            {product.marketName}
          </motion.p>

          <motion.p
            variants={motionCardVariants}
            className="text-sm text-gray-500 mb-2 flex items-center gap-1"
          >
            <span className="font-medium text-gray-700">Vendor:</span>
            {product.vendorName}
          </motion.p>

          <motion.p
            variants={motionCardVariants}
            className="text-sm text-gray-500 mb-4"
          >
            <span className="font-medium text-gray-700">Date:</span>{" "}
            {format(new Date(product.date), "dd MMM yyyy")}
          </motion.p>
        </div>

        {/* Price + Button */}
        <motion.div
          variants={motionCardVariants}
          className="mt-auto flex justify-between items-center"
        >
          <span className="text-base md:text-lg font-bold text-accent">
            ৳{product.priceUnit.toFixed(2)}
          </span>
          <button
            onClick={handleViewDetails}
            className="btn btn-sm btn-outline btn-primary"
          >
            <HiOutlineEye /> View
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SingleProduct;
