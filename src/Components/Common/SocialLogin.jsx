import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa6";
import ShowToast from "../UI/ShowToast";

const SocialLogin = () => {
  const { GoogleSignIn, setUser } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();

  const handleGoogle = () => {
    GoogleSignIn()
      .then((result) => {
        setUser(result.user);
        const userData = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photoURL: result?.user?.photoURL,
        };
        axios
          .post(`/auth/jwt`, userData)
          .then((res) => {
            localStorage.setItem("access-token", res.data.token);
            navigate("/dashboard");
          })
          .catch((err) => (
            ShowToast("error", err.message)
          ));
      })
      .catch((err) => (
       ShowToast("error", err.message)
      ));
  };

  return (
    <button
      onClick={handleGoogle}
      className="bg-primary/90 text-white hover:bg-primary w-full flex items-center gap-2 py-2 px-5 text-center rounded-md justify-center"
    >
      <FaGoogle size={20} />
      <span className="text-base font-medium ">Continue With Google</span>
    </button>
  );
};

export default SocialLogin;
