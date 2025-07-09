import React from "react";
import { Outlet } from "react-router";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      ease: "linear",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};
const AuthLayout = () => {
  return (
    <section className="register py-15 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-5">

        <motion.div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row bg-white border-2 border-[#faf5ee20] text-gray-100 shadow-lg rounded-2xl gap-5 items-center overflow-hidden">
          <motion.div className="img-box w-full md:w-1/2 h-auto md:h-[800px]"></motion.div>
          <motion.div className="w-full md:w-1/2">
            <Outlet></Outlet>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthLayout;
