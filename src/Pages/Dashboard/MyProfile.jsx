import React from "react";
import { format } from "date-fns";
import useUserData from "../../Hooks/useUserData";
import { Link } from "react-router";


const MyProfile = () => {
  const { userInfo } = useUserData();

  const getDate = (value) => {
    try {
      return value ? format(new Date(value), "EEE, MMM dd, yyyy p") : "";
    } catch {
      return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md border rounded-md mt-10">

      <div className="flex flex-col md:flex-row gap-6 p-6">
        
        {/* Left: Profile Card */}
        <div className="md:w-1/3 text-center border-r border-gray-200 pr-4">
          <img
            src={userInfo?.photoURL || "https://i.ibb.co/Yc0c90R/avatar-placeholder.png"}
            alt="User"
            className="w-28 h-28 rounded-full mx-auto mb-2 object-cover"
          />
          <h3 className="text-lg font-semibold">{userInfo?.name || "N/A"}</h3>
          <p className="text-sm text-gray-500 capitalize">{userInfo?.role || "user"}</p>
          <p className="text-xs mt-2 text-gray-500">
            <strong>Joined:</strong><br />
            {getDate(userInfo?.created_at)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            <strong>Last Login:</strong><br />
            {getDate(userInfo?.last_login)}
          </p>
        </div>

        {/* Right: Info Section */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-800">
          <p><strong>Email:</strong><br /> {userInfo?.email || ""}</p>
          <p><strong>Account Role:</strong><br /> {userInfo?.role || "user"}</p>
          <p><strong>Status:</strong><br /> {userInfo?.status || ""}</p>
          <p><strong>Vendor Request:</strong><br /> {userInfo?.vendorRequestStatus || ""}</p>
          <p><strong>Account ID:</strong><br /> {userInfo?._id || ""}</p>
        </div>
      </div>

      <div className="text-right px-6 pb-4">
        <Link to='/' className="btn btn-sm ">Go Home</Link>
      </div>
    </div>
  );
};

export default MyProfile;
