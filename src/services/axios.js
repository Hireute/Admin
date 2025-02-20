import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthorized } from '../store/userSlice/userSlice';
// import {BASE_URL} from './apis'
const BASE_URL = import.meta.env.VITE_APP_BASE_URL
 const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 300000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'ngrok-skip-browser-warning': '69420',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  export function setup() {
    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
  
    axiosInstance.interceptors.request.use(
      (config) => {
        config.headers = {
          Authorization: `${token ? `Bearer ${token}` : ''}`,
          ...config.headers,
        };
        return config;
      },
      (error) => Promise.reject(error)
    );
  
    axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (['Unauthorized', 'Forbidden'].includes(err?.response?.data.message)) {
          dispatch(setIsAuthorized(false));
        }
        return Promise.reject(err);
      }
    );
  }

  export default axiosInstance;

