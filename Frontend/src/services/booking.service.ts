import api from './api.service';

export const bookingService = {
  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  create: async (data: Record<string, unknown>) => {
    const response = await api.post('/bookings', data);
    return response.data;
  },

  updateStatus: async (id: number | string, status: string) => {
    const response = await api.put(`/bookings/${id}`, { status });
    return response.data;
  }
};
