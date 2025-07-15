import { motion } from "framer-motion";
import React from "react";
import BG from "../../assets/bg1.png"
import { motionContainerVariants, motionCardVariants } from "../../Libs/Utility";


const Newsletter = () => {
  return (
    <motion.section
      className="bg-gray-50 section-bg-image py-32 relative z-10 "
      variants={motionContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      style={{backgroundImage:`url(${BG})`}}
    >
      <div className="container mx-auto px-5">
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          variants={motionContainerVariants}
        >
          <motion.h3
            className="text-base md:text-lg text-accent font-bold mb-2"
            variants={motionCardVariants}
          >
            Our Newsletter
          </motion.h3>

          <motion.h2
            className="text-2xl md:text-4xl font-bold leading-tight mb-4"
            variants={motionCardVariants}
          >
            Subscribe to Our Newsletter to <br />
            <span className="text-primary">
              Get Updates on Our Latest Offers
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-600 mb-8"
            variants={motionCardVariants}
          >
            Get 25% off on your first order just by subscribing to our
            newsletter.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={motionCardVariants}
          >
            <input
              type="email"
              placeholder="Enter Email Address"
              className="px-5 py-3 rounded-full border border-accent/30 w-full sm:w-[400px] focus:outline-none hover:border-accent/80 focus:ring-1 focus:ring-accent transition-all duration-300 "
            />
            <button className="bg-accent hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 w-full md:w-auto shadow-sm hover:shadow-lg">
              Subscribe
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Newsletter;

