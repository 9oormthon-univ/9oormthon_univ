import { create } from 'zustand';
import { getUserBriefAPI, loginAPI, logoutAPI } from '../api/auth';
import { Role, UserStatus } from '../constants/role';

interface AuthStore {
  role: Role | null;
  status: UserStatus | null;
  img_url: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetToGuest: () => void;
}

// 초기 값은 모두 GUEST
if (!localStorage.getItem('role')) {
  localStorage.setItem('role', Role.GUEST);
}

const useAuthStore = create<AuthStore>((set) => ({
  role: (localStorage.getItem('role') as Role) || Role.GUEST,
  status: (localStorage.getItem('status') as UserStatus) || null,
  img_url: localStorage.getItem('img_url') || null,

  // 로그인
  login: async (serial_id: string, password: string) => {
    try {
      await loginAPI(serial_id, password);

      // 로그인 성공 후 유저 role 가져오기
      const response = await getUserBriefAPI();
      const { role, img_url, status } = response.data;

      localStorage.setItem('role', role);
      localStorage.setItem('status', status);
      if (img_url) {
        localStorage.setItem('img_url', img_url);
      } else {
        localStorage.removeItem('img_url');
      }

      set({
        role,
        img_url: img_url || null,
        status: status || null,
      });
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  },

  // 로그아웃
  logout: async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error('Logout error', error);
    }
    localStorage.setItem('role', Role.GUEST);
    localStorage.removeItem('img_url');
    localStorage.removeItem('status');
    localStorage.removeItem('idea_form');
    set({ role: Role.GUEST, img_url: null, status: null });
  },

  // 게스트로 초기화
  resetToGuest: () => {
    localStorage.setItem('role', Role.GUEST);
    localStorage.removeItem('img_url');
    localStorage.removeItem('status');
    localStorage.removeItem('idea_form');
    set({ role: Role.GUEST, img_url: null, status: null });
  },
}));

export default useAuthStore;
