import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import BG from "../../assets/bg1.png";
import { motionContainerVariants, motionCardVariants } from "../../Libs/Utility";


const PageHeader = ({ links, pageTitle, presentPage }) => {
  return (
    <motion.section
      className="pt-15 pb-10 section-bg-image relative z-10 bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${BG})` }}
      variants={motionContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="container px-5 mx-auto text-center"
        variants={motionContainerVariants}
      >
        <motion.p className="mb-2" variants={motionCardVariants}>
          <Link className="text-gray-500 hover:text-primary/80" to="/">
            Home /{" "}
          </Link>
          {links && (
            <Link
              className="text-gray-500 hover:text-primary/80"
              to={links.path}
            >
              {links.page} /
            </Link>
          )}
          <span className="text-primary font-semibold">{presentPage}</span>
        </motion.p>

        <motion.h1
          className="text-3xl md:text-4xl font-bold text-primary"
          variants={motionCardVariants}
        >
          {pageTitle}
        </motion.h1>
      </motion.div>
    </motion.section>
  );
};

export default PageHeader;

