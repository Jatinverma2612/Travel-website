import api from './api.service';

export const galleryService = {
  getAll: async () => {
    const response = await api.get('/gallery');
    return response.data;
  },

  create: async (formData: FormData) => {
    const response = await api.post('/gallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: number | string) => {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  }
};
