import api from './api.service';

export const enquiryService = {
  getAll: async () => {
    const response = await api.get('/enquiries');
    return response.data;
  },

  create: async (data: Record<string, unknown>) => {
    const response = await api.post('/enquiries', data);
    return response.data;
  },

  delete: async (id: number | string) => {
    const response = await api.delete(`/enquiries/${id}`);
    return response.data;
  }
};
