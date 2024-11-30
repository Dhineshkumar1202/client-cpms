// axiosConfig.js (client-side)
import axios from 'axios';

// Axios request interceptor to add the Authorization header with the token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add the token to the request header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axios;
