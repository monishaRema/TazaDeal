import { Helmet } from "@dr.pogodin/react-helmet";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "motion/react";
import Lottie from "lottie-react";
import ErrorLottie from "../assets/Lottie/Error.json";



const Error = () => {

    const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
  };
  return (
    <section className="register ">
      <Helmet>
        <title>Book Case | 404</title>
      </Helmet>
      <div className="container mx-auto px-5 text-center md:text-start">
        <div className="flex flex-col-reverse md:flex-row gap-10 items-center">
          <motion.div 
           initial="hidden"
            animate="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          className="mb-15 md:mb-0">
            <motion.h1 variants={cardVariants} className="text-4xl md:text-5xl mb-5 font-bold">
              Oops! Page not found{" "}
            </motion.h1>
            <motion.p variants={cardVariants} className="theme-p mb-5 text-gray-400">
              The page you're looking for seems doesn't exist.
            </motion.p>
            <motion.div variants={cardVariants} className="flex justify-center md:justify-start">
              <Link to="/" className="gradient-btn flex items-center gap-3">
                <FaArrowLeft className="text-xl" />
                <span> Go Back Home</span>
              </Link>
            </motion.div>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <Lottie
              style={{ width: "100%", height: "70%" }}
              animationData={ErrorLottie}
              loop={true}
            ></Lottie>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
