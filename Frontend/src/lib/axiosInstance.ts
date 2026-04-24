import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        
        // Only show "Session expired" if we're NOT on the login page
        if (window.location.pathname !== '/admin/login') {
          toast.error('Session expired. Please login again.');
          if (window.location.pathname.startsWith('/admin')) {
            window.location.href = '/admin/login';
          }
        } else {
          // If we ARE on the login page, it's likely invalid credentials
          toast.error(error.response?.data?.message || 'Invalid email or password');
        }
      }
    } else {
      const message = error.response?.data?.message || error.message || 'Something went wrong';
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
