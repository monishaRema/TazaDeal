import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { motionCardVariants, motionContainerVariants, siteTitle } from "../Libs/Utility";
import { Helmet } from "@dr.pogodin/react-helmet";

const Error = () => {
  return (
    <>
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={motionContainerVariants}
        className="min-h-screen flex items-center justify-center bg-secondary px-5"
      >
        <Helmet>
        <title>{siteTitle} | 404</title>
      </Helmet>
        <div className="text-center max-w-xl">
          <motion.h1
            animate={{
              backgroundPositionY: ["0%", "100%", "0%"],
            }}
            transition={{
              duration:15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="poppin text-[120px] md:text-[180px] lg:text-[280px] font-extrabold bg-clip-text text-transparent bg-[url('https://www.gardentech.com/-/media/project/oneweb/gardentech/images/blog/8-easy-to-grow-fruits-and-veggies/8_easy-to-grow_fruits_and_veggies_header.jpg')] bg-cover bg-center leading-none drop-shadow-xl"
          >
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </motion.h1>
          <motion.h2
            variants={motionCardVariants}
            className="heading text-primary mb-3"
          >
            Oops! Page Not Found
          </motion.h2>
          <motion.p
            variants={motionCardVariants}
            className="text-gray-600 mb-6"
          >
            Sorry, the page you’re looking for doesn’t exist. Maybe take a
            break, then head back home.
          </motion.p>
          <motion.span variants={motionCardVariants}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full shadow hover:bg-primary/90 transition"
            >
              <FaArrowLeft /> Go to Homepage
            </Link>
          </motion.span>
        </div>
      </motion.section>
    </>
  );
};

export default Error;
