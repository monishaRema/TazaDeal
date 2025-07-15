import React from "react";
import Newsletter from "../Components/Home/Newsletter";
import WhyTrustUs from "../Components/Home/WhyTrustUs ";
import PageHeader from "../Components/Common/PageHeader";
import { Link } from "react-router";
import useAuth from "../Hooks/useAuth";
import { motion } from "framer-motion";
import { FaHandsHelping, FaEye } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import { motionContainerVariants, motionCardVariants } from "../Libs/Utility";
import HowItWorks from "../Components/Home/HowItWorks";

const About = () => {
  const { user } = useAuth();

  return (
    <>
      <PageHeader pageTitle={"About Us"} presentPage={"about"}></PageHeader>
      <section className="bg-secondary py-24">
        <div className="container mx-auto px-5">
          <motion.div
            variants={motionContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col lg:flex-row gap-15 items-center mb-25"
          >
            <div className="img-box flex-1 overflow-hidden rounded-2xl">
              <motion.img
                variants={motionCardVariants}
                src="https://img.freepik.com/free-photo/happy-family-choosing-groceries_171337-2389.jpg"
                alt=""
                className="w-full max-h-[550px]"
              ></motion.img>
            </div>
            <div className="about-content flex-1 text-center lg:text-start">
              <motion.h1
                variants={motionCardVariants}
                className="heading text-primary"
              >
                About TazaDeal
              </motion.h1>
              <motion.p
                variants={motionCardVariants}
                className="text-lg mb-6 leading-relaxed text-gray-700"
              >
                <span className="font-semibold text-accent">TazaDeal</span> is
                your trusted marketplace for fresh fruits, vegetables, meat,
                dairy, and everyday essentials — sourced locally and delivered
                quickly. We aim to connect buyers with verified vendors offering
                real-time market pricing, ensuring transparency and trust in
                every transaction.
              </motion.p>
              <motion.span variants={motionCardVariants}>
                <Link
                  className="btn btn-accent text-white"
                  to={user ? "/all-products" : "/auth/register"}
                >
                  Get Started
                </Link>
              </motion.span>
            </div>
          </motion.div>

          <motion.div
            variants={motionContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-wrap gap-10"
          >
            {/*  Our Mission */}
            <div className="flex-1 min-w-xs text-center lg:text-start">
              <motion.div
                variants={motionCardVariants}
                className="flex flex-col items-center lg:items-start gap-3 mb-3"
              >
                <FaHandsHelping className="text-accent text-6xl" />
                <h2 className="sub-heading">Our Mission</h2>
              </motion.div>
              <motion.p
                variants={motionCardVariants}
                className="text-gray-700 leading-relaxed"
              >
                We believe in empowering communities by giving access to
                transparent pricing, quality food, and trusted local businesses.
                With{" "}
                <span className="font-semibold text-primary">TazaDeal</span>,
                you're not just buying groceries — you're making informed,
                sustainable, and budget-friendly choices.
              </motion.p>
            </div>
            {/* Our Vision */}
            <div className="flex-1 min-w-xs text-center lg:text-start">
              <motion.div
                variants={motionCardVariants}
                className="flex flex-col items-center lg:items-start gap-3 mb-3"
              >
                <FaEye className="text-primary text-6xl" />
                <h2 className="sub-heading">Our Vision</h2>
              </motion.div>
              <motion.p
                variants={motionCardVariants}
                className="text-gray-700 leading-relaxed"
              >
                Our vision is to build a future where every household can rely
                on real-time, hyperlocal market data to make smarter food
                decisions. Through{" "}
                <span className="font-semibold text-accent">transparency</span>{" "}
                and{" "}
                <span className="font-semibold text-accent">
                  community trust
                </span>
                , TazaDeal aims to redefine how people connect with local
                vendors and access fresh, affordable goods with confidence.
              </motion.p>
            </div>

            {/* What Makes Us Different */}
            <div className="flex-1 min-w-xs  text-center lg:text-start">
              <motion.div
                variants={motionCardVariants}
                className="flex flex-col items-center lg:items-start gap-3 mb-3"
              >
                <GiPriceTag className="text-cyan-600 text-6xl" />
                <h2 className="sub-heading">What Makes Us Different</h2>
              </motion.div>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-1">
                <motion.li variants={motionCardVariants}>
                  Real-time price tracking by vendors and buyers
                </motion.li>
                <motion.li variants={motionCardVariants}>
                  Verified vendors, reviewed by real users
                </motion.li>
                <motion.li variants={motionCardVariants}>
                  Fresh produce, directly from local markets
                </motion.li>
                <motion.li variants={motionCardVariants}>
                  Secure payments and buyer protection
                </motion.li>
                <motion.li variants={motionCardVariants}>
                  Community-driven with reviews, trends, and feedback
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
      <HowItWorks></HowItWorks>
      <WhyTrustUs></WhyTrustUs>
      <Newsletter></Newsletter>
    </>
  );
};

export default About;
