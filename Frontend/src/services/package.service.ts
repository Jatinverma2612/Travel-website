import api from './api.service';

export const packageService = {
  getAll: async () => {
    const response = await api.get('/packages');
    // Backend returns { success: true, data: [...] }
    return Array.isArray(response.data?.data) ? response.data.data : (Array.isArray(response.data) ? response.data : []);
  },

  getById: async (id: number | string) => {
    const response = await api.get(`/packages/${id}`);
    // Backend returns { success: true, data: {...} }
    return response.data?.data ?? response.data ?? null;
  },

  create: async (data: Record<string, unknown> | FormData) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    const response = await api.post('/packages', data, { headers });
    return response.data?.data ?? response.data;
  },

  update: async (id: number | string, data: Record<string, unknown> | FormData) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    const response = await api.put(`/packages/${id}`, data, { headers });
    return response.data?.data ?? response.data;
  },

  delete: async (id: number | string) => {
    const response = await api.delete(`/packages/${id}`);
    return response.data?.data ?? response.data;
  }
};
