// hooks/useAxiosSecure.js
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { baseURL } from "../Libs/Utility";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL,
  });


const useAxiosSecure = () => {
  const navigate = useNavigate();
  const {logOut} = useAuth();

  useEffect(() => {

    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });


    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logOut();
          localStorage.removeItem("access-token");
          navigate("/auth/login");
        }
        return Promise.reject(error);
      }
    );
  }, [axiosSecure, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
