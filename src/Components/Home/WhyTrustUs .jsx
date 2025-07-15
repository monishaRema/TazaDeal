import React from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaChartLine,
  FaUserCheck,
  FaShieldAlt,
} from "react-icons/fa";

const trustPoints = [
  {
    icon: <FaCheckCircle className="text-6xl" />,
    title: "Verified Vendors",
    desc: "All price data is submitted by verified local vendors to ensure authenticity.",
  },
  {
    icon: <FaChartLine className="text-6xl" />,
    title: "Real-Time Trends",
    desc: "We update prices daily so you can track real-time market fluctuations accurately.",
  },
  {
    icon: <FaShieldAlt className="text-6xl" />,
    title: "Data Transparency",
    desc: "Each product shows price history, vendor identity, and submission dates.",
  },
  {
    icon: <FaUserCheck className="text-6xl" />,
    title: "User Feedback",
    desc: "Buyers share honest reviews to give you insights beyond just numbers.",
  },
];

// Reusable buttery animation
const motionContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const motionCardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const WhyTrustUs = () => {
  return (
    <motion.section
      className="bg-white py-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-5">
        <motion.div variants={motionContainerVariants} className="text-center">
          <motion.h2
            variants={motionCardVariants}
            className="heading text-primary"
          >
            Why Trust Our Market Prices?
          </motion.h2>

          <motion.p
            variants={motionCardVariants}
            className="sec-desc max-w-2xl mx-auto mb-10"
          >
            We’re not just another marketplace. We’re here to build a reliable
            ecosystem where buyers and vendors benefit from transparent pricing.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={motionCardVariants}
        >
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              className="bg-secondary px-6 py-8 rounded-lg hover:shadow-lg transition duration-500 text-center group"
            >
              <div className="mb-5 flex justify-center text-primary group-hover:text-accent transition-all duration-500 ease-in-out">
                {point.icon}
              </div>
              <h4 className="card-heading mb-5">{point.title}</h4>
              <p className="text-gray-600 text-sm">{point.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyTrustUs;
