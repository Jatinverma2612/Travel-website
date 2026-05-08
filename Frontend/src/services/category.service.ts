import api from './api.service';

export const categoryService = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data?.data || [];
  },

  getById: async (id: number | string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data?.data || null;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get(`/categories/slug/${slug}`);
    return response.data?.data || null;
  },

  create: async (data: FormData) => {
    const response = await api.post('/categories', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data?.data;
  },

  update: async (id: number | string, data: FormData) => {
    const response = await api.put(`/categories/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data?.data;
  },

  delete: async (id: number | string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  }
};
