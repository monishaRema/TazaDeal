import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaChartLine, FaUserCheck, FaShieldAlt } from "react-icons/fa";

const trustPoints = [
  {
    icon: <FaCheckCircle className="text-green-500 text-3xl" />,
    title: "Verified Vendors",
    desc: "All price data is submitted by verified local vendors to ensure authenticity.",
  },
  {
    icon: <FaChartLine className="text-blue-500 text-3xl" />,
    title: "Real-Time Trends",
    desc: "We update prices daily so you can track real-time market fluctuations accurately.",
  },
  {
    icon: <FaUserCheck className="text-purple-500 text-3xl" />,
    title: "User Feedback",
    desc: "Buyers share honest reviews to give you insights beyond just numbers.",
  },
  {
    icon: <FaShieldAlt className="text-yellow-500 text-3xl" />,
    title: "Data Transparency",
    desc: "Each product shows price history, vendor identity, and submission dates.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeInOut",
    },
  }),
};

const WhyTrustUs = () => {
  return (
    <section className="bg-white py-25">
      <div className="container mx-auto px-5 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6 text-primary"
        >
          Why Trust Our Market Prices?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          We’re not just another marketplace. We’re here to build a reliable ecosystem where buyers and vendors benefit from transparent pricing.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((point, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="mb-4">{point.icon}</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{point.title}</h4>
              <p className="text-gray-600 text-sm">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;
