import React from "react";
import { format } from "date-fns";
import useUserData from "../../Hooks/useUserData";
import { Link } from "react-router";
import { siteTitle } from "../../Libs/Utility";
import { Helmet } from "react-helmet";


const MyProfile = () => {
  const { userInfo } = useUserData();
console.log(userInfo)
  const getDate = (value) => {
    try {
      return value ? format(new Date(value), "EEE, MMM dd, yyyy p") : "";
    } catch {
      return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Helmet>
        <title>{siteTitle} | My Profile</title>
      </Helmet>

      <div className="flex flex-col md:flex-row gap-6 p-6">
        
        {/* Left: Profile Card */}
        <div className="md:w-1/2 text-center  bg-white shadow-md rounded-md p-5">
          <img
            src={userInfo?.photoURL || "https://i.ibb.co/Yc0c90R/avatar-placeholder.png"}
            alt="User"
            className="w-28 h-28 rounded-full mx-auto mb-2 object-cover"
          />
          <h3 className="text-lg font-semibold">{userInfo?.name || "N/A"}</h3>
          <p className="text-md text-gray-500 capitalize mb-5">{userInfo?.role || "user"}</p>
          <div className="px-6">
        <Link to='/' className="btn btn-primary">Go Home</Link>
      </div>
        </div>

        {/* Right: Info Section */}
        <div className="md:w-1/2 bg-white shadow-md rounded-md p-5 text-sm text-gray-800">
        <h3 className="text-2xl mb-5 font-bold text-primary">Additional Info</h3>
          <p className="mb-1 text-sm md:text-base"><strong>Email : </strong>{userInfo?.email || ""}</p>
          <p className="mb-1 text-sm md:text-base"><strong>Account Role : </strong>{userInfo?.role || "user"}</p>
          <p className="mb-1 text-sm md:text-base"><strong>Status : </strong>{userInfo?.status || ""}</p>
          <p className="mb-1 text-sm md:text-base"><strong>Vendor Request : </strong> {userInfo?.vendorRequestStatus || ""}</p>
          <p className="mb-1 text-sm md:text-base"><strong>Joined : </strong>{getDate(userInfo?.joined)}</p>
          <p className="mb-1 text-sm md:text-base"><strong>Last Login : </strong>{getDate(userInfo?.last_login)}</p>
        </div>
      </div>

     
    </div>
  );
};

export default MyProfile;
