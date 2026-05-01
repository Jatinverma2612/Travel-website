import api from './api.service';

export const packageService = {
  getAll: async () => {
    const response = await api.get('/packages');
    return response.data;
  },
  
  getById: async (id: number | string) => {
    const response = await api.get(`/packages/${id}`);
    return response.data;
  },

  create: async (data: Record<string, unknown> | FormData) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    const response = await api.post('/packages', data, { headers });
    return response.data;
  },

  update: async (id: number | string, data: Record<string, unknown> | FormData) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    const response = await api.put(`/packages/${id}`, data, { headers });
    return response.data;
  },
  
  delete: async (id: number | string) => {
    const response = await api.delete(`/packages/${id}`);
    return response.data;
  }
};
