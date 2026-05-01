import { useState } from 'react';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const logoutStore = useAuthStore((state) => state.logout);

  const login = async (credentials: Record<string, unknown>) => {
    setIsLoading(true);
    try {
      const data = await authService.login(credentials);
      // Backend returns { id, email, token }
      setAuth({ id: data.id, email: data.email }, data.token);
      toast.success('Login successful!');
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error && 'response' in error
        ? (error as any).response?.data?.message
        : 'Login failed';
      toast.error(message || 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      logoutStore();
      toast.success('Logged out successfully');
      return true;
    } catch (error) {
      toast.error('Logout failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    logout,
    isLoading,
  };
};
