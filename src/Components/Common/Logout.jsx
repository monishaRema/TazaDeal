import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import ShowToast from "../UI/ShowToast";

const Logout = ({ classes, children }) => {
  const navigate = useNavigate();
  const { LogOut, setUser } = useAuth();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure, Logout?",
      showCancelButton: true,
      confirmButtonColor: "#E47811",
      cancelButtonColor: "#146131",
      confirmButtonText: "Logout",
    }).then((result) => {
 
      if (result.isConfirmed) {
        LogOut()
        .then(() => {
          localStorage.removeItem("access-token");
          setUser(null);
          navigate("/auth/login");
        })
        .catch( err => <ShowToast status="error" message={err.message}></ShowToast>)
      }
    });
  };
  return (
    <button className={classes} onClick={handleLogout}>
      {children}
    </button>
  );
};

export default Logout;
