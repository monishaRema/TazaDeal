import React from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "../Pages/Dashboard/Sidebar/DashboardSidebar";
import useAuth from "../Hooks/useAuth";
import LOGO from "../assets/logo.svg";
import { motion } from "framer-motion";
const navVarient = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
const DashboardLayout = () => {
  const { user } = useAuth();
  return (
    <>
      <motion.header
        initial="hidden"
        animate="show"
        variants={navVarient}
        className=" bg-white/85 backdrop-blur-md px-5 py-4 flex gap-5 items-center justify-between"
      >
        <motion.div
          variants={navItemVariants}
          className="flex gap-1 items-center"
        >
          <motion.img
            variants={navItemVariants}
            src={LOGO}
            alt="Taza Deal Logo"
            className="size-10 md:size-15 max-w-full"
          ></motion.img>
          <motion.h3
            variants={navItemVariants}
            className="text-xl md:text-2xl font-bold flex flex-col gap-1"
          >
            <span className="text-primary">Taza</span>
            <span className="text-accent -mt-2">Deal</span>
          </motion.h3>
        </motion.div>

        <motion.div variants={navItemVariants} className="flex gap-5">
          <h1 className="text-lg font-semibold">
            Welcome back, {user?.displayName}
          </h1>
          <img
            src={user?.photoURL}
            alt="avatar"
            className="size-10 rounded-full object-cover"
          />
        </motion.div>
      </motion.header>
      <div className="flex overflow-hidden h-screen">
        {/* Sidebar */}
        <aside className="w-15 md:w-65 bg-white sticky top-0 left-0 h-screen overflow-y-auto  z-40 px-2 md:px-5">
          <DashboardSidebar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col bg-secondary overflow-y-auto p-6 hide-scrollbar">
            <Outlet />
        </main>
      </div>

      <footer className="w-full bg-white px-6 py-5 text-center">
        <p>All the right reserved TazaDeal.</p>
      </footer>
    </>
  );
};

export default DashboardLayout;
