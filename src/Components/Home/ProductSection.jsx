import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../UI/LoadingSpinner";
import SingleProduct from "../Product/SingleProduct";
import useAxios from "../../Hooks/useAxios";
import { motion } from "framer-motion";
import {
  motionContainerVariants,
  motionCardVariants,
} from "../../Libs/Utility";

const ProductSection = () => {
  const axiosPublic = useAxios();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["latest-approved-products"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/public/latest-products?limit=6");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.section
      className="py-25"
      variants={motionContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-10">
          <motion.h2 variants={motionCardVariants} className="heading">
            Latest <span className="text-primary">Products</span>
          </motion.h2>
          <motion.p
            variants={motionCardVariants}
            className="sec-desc max-w-xl mx-auto"
          >
            Discover fresh local updates from vendors. Products reflect the most
            recent market pricing from regional bazaars.
          </motion.p>
        </motion.div>

        <motion.div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 &&
            products.map((product) => (
              <SingleProduct key={product._id} product={product} />
            ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductSection;
