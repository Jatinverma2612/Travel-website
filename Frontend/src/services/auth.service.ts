import api from './api.service';

export const authService = {
  login: async (credentials: Record<string, unknown>) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  createAdmin: async (data: Record<string, unknown>) => {
    const response = await api.post('/auth/create-admin', data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  
  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },
  
  verifyOtp: async (email: string, otp: string) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  },
  
  resetPassword: async (data: Record<string, unknown>) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },
  
  changePassword: async (data: Record<string, unknown>) => {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  }
};
