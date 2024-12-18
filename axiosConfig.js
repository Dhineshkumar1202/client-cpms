import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://cpmsapp-q59f2p6k.b4a.run', 
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Redirecting to login...");
    
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
