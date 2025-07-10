import React from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import {
  FaHome,
  FaTasks,
  FaChartBar,
  FaPowerOff,
  FaBox,
  FaClipboardList,
  FaUsersCog,
  FaCog,
} from "react-icons/fa";
import useUserRole from "../../../Hooks/useUserRole";
import LoadingSpinner from "../../../Components/UI/LoadingSpinner";
import Logout from "../../../Components/Common/Logout";
import LOGO from "../../../assets/logo.svg"

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

const SidebarLink = ({ to, icon, label }) => {
  return (
    <motion.li variants={navItemVariants}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `group flex items-center gap-4 px-3 md:px-5 py-3 rounded-md md:rounded-lg transition cursor-pointer
           ${isActive ? "bg-secondary font-semibold text-gray-900" : "text-gray-700 hover:bg-gray-100"}`
        }
      >
        {icon}
        <span className="hidden md:inline text-sm">{label}</span>
      </NavLink>
    </motion.li>
  );
};

const DashboardSidebar = () => {
  const { role, isLoading } = useUserRole();
  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.ul
      initial="hidden"
      animate="show"
      variants={navVarient}
      className="w-full py-2 md:py-5 flex flex-col gap-2 min-h-screen"
    >
       <motion.li variants={navItemVariants} className="mb-5">
         <div className='flex gap-1 items-center'>
                    <img src={LOGO} alt="Taza Deal Logo" className='size-10 md:size-15 max-w-full' />
                    <h3 className='text-2xl font-bold hidden md:flex flex-col '>
                        <span className="text-primary">Taza</span>
                        <span className="text-accent -mt-2">Deal</span>
                    </h3>
                </div>
       </motion.li>
      <SidebarLink to="/" icon={<FaHome />} label="Home" />
      <SidebarLink to="/dashboard" icon={<FaChartBar />} label="Dashboard" />

      {role === "admin" && (
        <>
          <SidebarLink to="/dashboard/manage-users" icon={<FaUsersCog />} label="Manage Users" />
          <SidebarLink to="/dashboard/site-settings" icon={<FaCog />} label="Settings" />
        </>
      )}

      {role === "vendor" && (
        <>
          <SidebarLink to="/dashboard/add-product" icon={<FaBox />} label="Add Product" />
          <SidebarLink to="/dashboard/my-products" icon={<FaClipboardList />} label="My Products" />
        </>
      )}

      {role === "user" && (
        <>
        <SidebarLink to="/dashboard/be-vendor" icon={<FaTasks />} label="Become Vendor" />
        <SidebarLink to="/dashboard/my-orders" icon={<FaTasks />} label="My Orders" />
        </>
      )}
       <SidebarLink to="/dashboard/my-profile" icon={<FaChartBar />} label="My Profile" />

      <motion.li variants={navItemVariants} className="mt-auto">
  
            
        <Logout classes="group flex items-center gap-4 px-3 md:px-5 py-3 rounded-md md:rounded-lg transition cursor-pointer
          text-gray-700 hover:bg-gray-100 w-full">
          <FaPowerOff></FaPowerOff>
          <span className="hidden md:inline text-sm">Logout</span>
        </Logout>
      
        
      </motion.li>
    </motion.ul>
  );
};

export default DashboardSidebar;
