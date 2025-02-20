import { create } from 'zustand';
import { getUserBriefAPI, loginAPI, logoutAPI } from '../api/auth';

interface AuthStore {
  role: string;
  img_url: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetToGuest: () => void;
}

if (!localStorage.getItem('role')) {
  localStorage.setItem('role', 'GUEST');
}

const useAuthStore = create<AuthStore>((set) => ({
  role: localStorage.getItem('role') || 'GUEST',
  img_url: localStorage.getItem('img_url') || null,

  login: async (serial_id: string, password: string) => {
    try {
      await loginAPI(serial_id, password);

      // 로그인 성공 후 유저 role 가져오기
      const response = await getUserBriefAPI();
      const { role, img_url } = response.data;

      localStorage.setItem('role', role);
      if (img_url) {
        localStorage.setItem('img_url', img_url);
      } else {
        localStorage.removeItem('img_url');
      }

      set({
        role,
        img_url: img_url || null,
      });
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
    localStorage.removeItem('img_url');
    set({ role: 'GUEST', img_url: null });
  },

  resetToGuest: () => {
    localStorage.setItem('role', 'GUEST');
    localStorage.removeItem('img_url');
    set({ role: 'GUEST', img_url: null });
  },
}));

export default useAuthStore;
