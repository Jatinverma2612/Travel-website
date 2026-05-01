import api from './api.service';

export const reviewService = {
  getAll: async () => {
    const response = await api.get('/reviews');
    return response.data;
  },

  create: async (data: { name: string; rating: number; message: string }) => {
    const response = await api.post('/reviews', data);
    return response.data;
  }
};
