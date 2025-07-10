
import axios from 'axios';
import { baseURL } from '../Libs/Utility';

const axiosInstance = axios.create({
    baseURL: `${baseURL}`
});


const useAxios = () => {
    return axiosInstance
};

export default useAxios;