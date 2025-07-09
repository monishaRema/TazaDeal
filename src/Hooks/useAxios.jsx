
import axios from 'axios';
import { baseUrl } from '../Libs/Utility';

const axiosInstance = axios.create({
    baseURL: `${baseUrl}`
});


const useAxios = () => {
    return axiosInstance
};

export default useAxios;