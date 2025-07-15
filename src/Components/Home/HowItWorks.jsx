import React from "react";
import { motion } from "framer-motion";
import { FaSearchDollar, FaStore, FaHandshake, FaTruck } from "react-icons/fa";
import {
  motionContainerVariants,
  motionCardVariants,
} from "../../Libs/Utility";


const steps = [
  {
    icon: <FaSearchDollar className="text-6xl" />,
    title: "Browse & Compare",
    desc: "Explore daily prices submitted by verified vendors across local markets.",
  },
  {
    icon: <FaStore className="text-6xl" />,
    title: "Choose a Vendor",
    desc: "Select a vendor offering the best value and freshest produce for your needs.",
  },
  {
    icon: <FaHandshake className="text-6xl" />,
    title: "Place Your Order",
    desc: "Easily place your order and proceed to secure payment using your preferred method.",
  },
  {
    icon: <FaTruck className="text-6xl" />,
    title: "Delivery or Pickup",
    desc: "Receive your order directly or coordinate a pickup with the vendor—it’s that simple.",
  },
];

const HowItWorks = () => {
  
  return (
    <motion.section className="bg-gray-50 py-24">
      <div className="container mx-auto px-5">
        {/* Heading */}
        <motion.div
          variants={motionContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.h2 variants={motionCardVariants} className="heading">
            How <span className="text-accent">TazaDeal</span> Works
          </motion.h2>

          <motion.p
            variants={motionCardVariants}
            className="sec-desc max-w-2xl mx-auto mb-10"
          >
            From price discovery to doorstep delivery, here’s how we simplify
            your shopping experience through local markets and trusted vendors.
          </motion.p>
        </motion.div>

        {/* Step Cards */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={motionContainerVariants}
              initial="hidden"
               whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white px-6 py-8 rounded-lg hover:shadow-lg transition duration-500 text-center group border border-gray-100"
            >
              <motion.div variants={motionCardVariants} className="mb-5 flex justify-center text-accent">
                {step.icon}
              </motion.div>
              <motion.h4 variants={motionCardVariants} className="card-heading mb-5">{step.title}</motion.h4>
              <motion.p variants={motionCardVariants} className="text-gray-600 text-sm">{step.desc}</motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
