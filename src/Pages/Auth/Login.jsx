import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Contex/AuthContex";
import { Helmet } from "@dr.pogodin/react-helmet";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import SocialLogin from "../../Components/Common/SocialLogin";
import { siteTitle } from "../../Libs/Utility";
import useAxios from "../../Hooks/useAxios";
import Logo from "../../Components/UI/Logo";
import ShowToast from "../../Components/UI/ShowToast";

const Login = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { Login, setUser } = use(AuthContext);
  const axios = useAxios();

  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setErrorMessage("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (!hasLowercase) {
      setErrorMessage("Password must include at least one lowercase letter.");
      return;
    }
    if (!hasUppercase) {
      setErrorMessage("Password must include at least one uppercase letter.");
      return;
    }
    if (!hasNumber) {
      setErrorMessage("Password must include at least one number.");
      return;
    }

    Login(email, password)
      .then((result) => {
        setUser(result.user);
        const userData = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photoURL: result?.user?.photoURL,
        };
        axios.post(`/auth/jwt`, userData)
        .then((res) => {
        
          localStorage.setItem("access-token", res.data.token);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
   
          navigate("/");
        })
        .catch(err => ShowToast("error", err.message));
        
      })
      .catch(err => ShowToast("error", "Please Provide valid credentials"))
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
        ease: "linear",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      viewport={{ once: true, amount: 0.2 }}
      className="form-box w-full p-6 md:p-10 text-gray-700"
    >
      <Helmet>
        <title>{siteTitle} | Login</title>
      </Helmet>

     

      <form onSubmit={handleLogin}>
        <div className="mb-8"><Logo></Logo></div>
        <motion.h1
          variants={cardVariants}
          className="text-3xl md:text-4xl font-bold mb-2 text-primary"
        >
          Login
        </motion.h1>
        <motion.p
          variants={cardVariants}
          className="mb-7 theme-p text-gray-500"
        >
          Sign in to continue your journey with TazaDeal
        </motion.p>

        <motion.div variants={cardVariants} className="form-group mb-5">
          <label htmlFor="email" className="block mb-2 theme-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 border border-gray-700 rounded focus:border-accent outline-none theme-input"
            placeholder="Enter your email"
            required
          />
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="form-group mb-5 relative"
        >
          <label htmlFor="password" className="block mb-2 theme-label">
            Password
          </label>
          <input
            type={showpassword ? "text" : "password"}
            id="password"
            name="password"
            className="w-full p-3 border border-gray-700 rounded focus:border-accent outline-none theme-input"
            placeholder="Enter your password"
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showpassword);
            }}
            className="absolute top-12 right-6 text-accent"
          >
            {showpassword ? <LuEye size={24} /> : <LuEyeClosed size={24} />}
          </button>
        </motion.div>

        {errorMessage && (
          <motion.p
            variants={cardVariants}
            className="text-red-500 text-sm text-center my-3"
          >
            {errorMessage}
          </motion.p>
        )}
        <motion.div variants={cardVariants}>
          <motion.button
            type="submit"
            className="btn btn-accent text-gray-100 block w-full uppercase"
          >
            Login
          </motion.button>
        </motion.div>
      </form>

   



      <motion.p
        variants={cardVariants}
        className="font-semibold text-center mt-2"
      >
        Do not have an account?{" "}
        <Link className="text-accent hover:text-primary " to="/auth/register">
          Register
        </Link>
      </motion.p>

      <motion.div
        variants={cardVariants}
        className="flex items-center my-4 gap-2"
      >
        <hr className="flex-grow border-gray-300" />
        <span className="text-gray-400 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </motion.div>

      <motion.div variants={cardVariants} className="social-login mt-5">
        <SocialLogin></SocialLogin>
      </motion.div>
    </motion.div>
  );
};

export default Login;
