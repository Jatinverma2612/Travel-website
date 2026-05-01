import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

const axiosInstance = axios.create({
  baseURL: baseURL.replace(/\/$/, "") + "/api", // remove trailing slash + add /api safely
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper: only show toasts on the client side
function showToast(type: 'error' | 'success', message: string) {
  if (typeof window === 'undefined') return;
  import('react-hot-toast').then(({ default: toast }) => {
    if (type === 'error') toast.error(message);
    else toast.success(message);
  });
}

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    // If 401 and not already retrying
    if (error?.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (typeof window !== 'undefined') {
        // If we're on the login page, don't try to refresh
        if (window.location.pathname === '/admin/login') {
          const message = error.response?.data?.message || 'Invalid credentials';
          showToast('error', message);
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
          // Use basic axios to avoid interceptor loop
          const res = await axios.post(
            `${baseURL}/api/auth/refresh-token`,
            {},
            { withCredentials: true }
          );

          const { token } = res.data;
          
          if (token) {
            localStorage.setItem('accessToken', token);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed - clear everything and redirect
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          
          if (window.location.pathname.startsWith('/admin')) {
            showToast('error', 'Session expired. Please login again.');
            window.location.href = '/admin/login';
          }
          return Promise.reject(refreshError);
        }
      }
    }

    // Handle other errors
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    showToast('error', message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
