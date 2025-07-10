import React, { use, useState } from "react";
import { AuthContext } from "../../Contex/AuthContex";
import { useLocation } from "react-router";
import { Slide, toast } from "react-toastify";
import { Helmet } from "@dr.pogodin/react-helmet";

const ForgotPass = () => {
  const location = useLocation();
  const prevEmail = location.state?.emailInput || "";
  const [errorMessage, setErrorMessage] = useState("");
  const { forgotPass } = use(AuthContext);

  const halndleForgetPassword = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    forgotPass(email)
      .then(() => {
        toast.success(
          "A reset password email is sent.Please check your mailbox",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          }
        );
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };
  return (
    <section className="register py-25">
      <div className="container mx-auto px-5">
      <Helmet>
        <title>Planto | Password Reset</title>
      </Helmet>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5 ">
        <h2 className="font-semibold text-2xl text-center">
          Login your account
        </h2>
        <form onSubmit={halndleForgetPassword} className="card-body">
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email"
            defaultValue={prevEmail}
            required
          />
          {errorMessage && (
            <p className="text-red-500 text-sm text-center mt-3">
              {errorMessage}
            </p>
          )}

          <button type="submit" className="btn btn-secondary mt-4">
            Reset Password
          </button>
        </form>
      </div>
    </div>
    </section>
  );
};

export default ForgotPass;
