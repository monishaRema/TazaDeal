import axios from 'axios';
import { use, useEffect} from 'react';
import { baseUrl } from '../Libs/Utility';
import { AuthContext } from '../Contex/AuthContex';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

const UseAxiosSecure = () => {
  const { user } = use(AuthContext);

  useEffect(() => {
    if (!user) return;

    const requestInterceptor = axiosInstance.interceptors.request.use(async (config) => {
      const token = await user.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosInstance;
};

export default UseAxiosSecure;