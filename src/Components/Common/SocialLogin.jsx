import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import { useLocation, useNavigate } from 'react-router';
import { FaGoogle } from 'react-icons/fa6';



const SocialLogin = () => {
 const { GoogleSignIn, setUser } = useAuth();
 const axios = useAxios();
 const navigate = useNavigate(); 
  const location = useLocation();
  const locationState = location.state;

 const handleGoogle = () => {
    GoogleSignIn()
      .then((result) => {
        setUser(result.user);
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };
        axios
          .post(`/user`, userData)
          .then((res) => {
            if (res.data.success == true) {
            //   Swal.fire({
            //     position: "center center",
            //     icon: "success",
            //     title: "You have logged in successfully",
            //     showConfirmButton: false,
            //     timer: 1500,
            //   });

              if (locationState) {
                navigate(locationState);
              } else {
                navigate("/");
              }
            }
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  };


    return (
         <button
                onClick={handleGoogle}
                className="bg-primary/90 text-white hover:bg-primary w-full flex items-center gap-2 py-2 px-5 text-center rounded-md justify-center"
              >
                <FaGoogle size={20} />
                <span className="text-base font-medium ">
                  Continue With Google
                </span>
            </button>
    );
};

export default SocialLogin;