import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";

import { AuthContext } from "../../Contex/AuthContex";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import { Slide, toast } from "react-toastify";
import UserAvator from "../../assets/userAvator.png";
import { FaBarsStaggered } from "react-icons/fa6";
import { delay, motion } from "framer-motion";
import Logo from "../UI/Logo";
import Logout from "../Common/Logout";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { user} = use(AuthContext);
  const photoUrl = user && user.photoURL ? user.photoURL : UserAvator;

  const navVarient = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -150 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "linear",
      },
    },
  };

  return (
    <header className="h-20">
      <motion.nav
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={navVarient}
        className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-primary/70 via-green-700 to-primary  text-white z-50"
      >
        <div className="container mx-auto px-5">
          <div className="navbar px-0 flex justify-between items-center py-3">
            <div className="flex items-center gap-3 lg:gap-0">
              <div className="mobile-menu block lg:hidden">
                <button
                  className={`text-2xl rotate-180 ${
                    navOpen ? "text-accent" : ""
                  }`}
                  onClick={() => setNavOpen((prev) => !prev)}
                >
                  <FaBarsStaggered />
                </button>
                <div
                  className={`dropdown-container ${navOpen ? "active" : ""}`}
                >
                  {navOpen && (
                    <motion.ul
                      initial="hidden"
                      animate="show"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={containerVariants}
                      tabIndex={0}
                      className={`dropdown-box`}
                    >
                      <motion.li
                        onClick={() => setNavOpen(false)}
                        variants={cardVariants}
                      >
                        <NavLink className={"navlink"} to="/">
                          Home
                        </NavLink>
                      </motion.li>
                       <motion.li
                        onClick={() => setNavOpen(false)}
                        variants={cardVariants}
                      >
                        <NavLink className={"navlink"} to="/all-products">
                          All Products
                        </NavLink>
                      </motion.li>

                      <motion.li
                        onClick={() => setNavOpen(false)}
                        variants={cardVariants}
                      >
                        <NavLink className={"navlink"} to="/about">
                          About Us
                        </NavLink>
                      </motion.li>
                      {user && <></>}
                    </motion.ul>
                  )}
                </div>
              </div>
              <Link className="" to="/">
                <Logo nav="nav" ></Logo>
              </Link>
            </div>

            <div className="flex gap-5">
              <ul className="hidden lg:flex flex-row">
                <motion.li variants={navItemVariants}>
                  <NavLink
                    to="/"
                    className="navlink text-base md:text-lg font-medium inline-block py-3 px-6 "
                  >
                    Home
                  </NavLink>
                </motion.li>
                           <motion.li variants={navItemVariants}>
                  <NavLink
                    to="/all-products"
                    className="navlink text-base md:text-lg font-medium inline-block py-3 px-6 "
                  >
                    All Products
                  </NavLink>
                </motion.li>

                <motion.li variants={navItemVariants}>
                  <NavLink
                    to="/about"
                    className="navlink text-base md:text-lg font-medium inline-block py-3 px-6 "
                  >
                    About Us
                  </NavLink>
                </motion.li>
                {user && <></>}
              </ul>
              <motion.div
                variants={navItemVariants}
                className="buttons flex gap-2 md:gap-3 items-center"
              >
                {user && (
                  <>
                  <Link
                      className="size-10 rounded-full overflow-hidden"
                      data-tooltip-id="profile-tooltip"
                    >
                      <img src={photoUrl} alt="" className="size-full object-cover" />
                    </Link>
                  <Link to={'/dashboard'} className="nav-btn">

                    Dashboard
                  </Link>
                    
                    <Tooltip
                      id="profile-tooltip"
                      place="bottom"
                      variant="white"
                    >
                      <div className="flex flex-col p-3 bg-primary text-white rounded z-[999]">
                        <p>{user?.displayName}</p>
                      </div>
                    </Tooltip>
                  </>
                )}

                {user ? (
                  <Logout classes={"nav-btn-alt"}>Logout</Logout>
                ) : (
                  <>
                    <Link
                      to="/auth/register"
                      className="nav-btn text-base md:text-xl"
                    >
                      Register
                    </Link>

                    <Link
                      to="/auth/login"
                      className="nav-btn-alt text-base md:text-xl"
                    >
                      LogIn
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;
