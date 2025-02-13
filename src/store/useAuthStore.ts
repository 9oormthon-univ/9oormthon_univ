import { create } from 'zustand';
import { getUserBriefAPI, loginAPI, logoutAPI } from '../api/auth';

interface AuthStore {
  role: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetToGuest: () => void;
}

if (!localStorage.getItem('role')) {
  localStorage.setItem('role', 'GUEST');
}

const useAuthStore = create<AuthStore>((set) => ({
  role: localStorage.getItem('role') || 'GUEST',

  login: async (serial_id: string, password: string) => {
    try {
      await loginAPI(serial_id, password);

      // 로그인 성공하고, 유저 role 가져오는 api
      const response = await getUserBriefAPI();
      const userRole = response.data.role;

      localStorage.setItem('role', userRole);
      set({ role: userRole });
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error('Logout error', error);
    }
    localStorage.setItem('role', 'GUEST');
    set({ role: 'GUEST' });
  },

  resetToGuest: () => {
    localStorage.setItem('role', 'GUEST');
    set({ role: 'GUEST' });
  },
}));

export default useAuthStore;
