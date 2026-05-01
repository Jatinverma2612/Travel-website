import api from './api.service';

export const authService = {
  login: async (credentials: Record<string, unknown>) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (data: Record<string, unknown>) => {
    const response = await api.post('/auth/register', data);
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
  
  changePassword: async (data: Record<string, unknown>) => {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  }
};
