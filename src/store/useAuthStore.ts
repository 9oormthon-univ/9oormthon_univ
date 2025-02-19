import { create } from 'zustand';
import { getUserBriefAPI, loginAPI, logoutAPI } from '../api/auth';

interface AuthStore {
  role: string;
  profile_img: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetToGuest: () => void;
}

if (!localStorage.getItem('role')) {
  localStorage.setItem('role', 'GUEST');
}

const useAuthStore = create<AuthStore>((set) => ({
  role: localStorage.getItem('role') || 'GUEST',
  profile_img: localStorage.getItem('profile_img') || null,

  login: async (serial_id: string, password: string) => {
    try {
      await loginAPI(serial_id, password);

      // 로그인 성공 후 유저 role 가져오기
      const response = await getUserBriefAPI();
      const { role, profile_img } = response.data;

      localStorage.setItem('role', role);
      if (profile_img) {
        localStorage.setItem('profile_img', profile_img);
      } else {
        localStorage.removeItem('profile_img');
      }

      set({
        role,
        profile_img: profile_img || null,
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
    localStorage.removeItem('profile_img');
    set({ role: 'GUEST', profile_img: null });
  },

  resetToGuest: () => {
    localStorage.setItem('role', 'GUEST');
    localStorage.removeItem('profile_img');
    set({ role: 'GUEST', profile_img: null });
  },
}));

export default useAuthStore;
