import { create } from 'zustand';
import { getUserBriefAPI, loginAPI, logoutAPI } from '../api/auth';

interface AuthStore {
  role: string;
  profile_img: string | null;
  is_provider: boolean | null;
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
  is_provider: localStorage.getItem('is_provider') ? JSON.parse(localStorage.getItem('is_provider')!) : null,

  login: async (serial_id: string, password: string) => {
    try {
      await loginAPI(serial_id, password);

      // 로그인 성공 후 유저 role 가져오기
      const response = await getUserBriefAPI();
      const { role, profile_img, is_provider } = response.data;

      localStorage.setItem('role', role);
      if (profile_img) {
        localStorage.setItem('profile_img', profile_img);
      } else {
        localStorage.removeItem('profile_img');
      }
      localStorage.setItem('is_provider', JSON.stringify(is_provider));

      set({
        role,
        profile_img: profile_img || null,
        is_provider,
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
    localStorage.removeItem('is_provider');
    set({ role: 'GUEST', profile_img: null, is_provider: null });
  },

  resetToGuest: () => {
    localStorage.setItem('role', 'GUEST');
    localStorage.removeItem('profile_img');
    localStorage.removeItem('is_provider');
    set({ role: 'GUEST', profile_img: null, is_provider: null });
  },
}));

export default useAuthStore;
