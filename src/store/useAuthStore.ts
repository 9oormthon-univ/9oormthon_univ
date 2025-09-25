import { create } from 'zustand';
import { getUserBriefAPI, loginAPI, logoutAPI } from '../api/auth';
import { Role, UserStatus } from '../constants/role';
import { toast } from '@goorm-dev/vapor-components';
import { UserBrief } from '@/types/user/users';

interface AuthStore {
  role: Role;
  status: UserStatus | null;
  img_url: string | null;
  isFetched: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetToGuest: () => void;
  updateProfileImage: (imgUrl: string | null) => void;
  updateUserFromQuery: (data: UserBrief) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  role: Role.GUEST,
  status: null,
  isFetched: false,
  img_url: localStorage.getItem('img_url') || null,

  // 로그인
  login: async (serial_id: string, password: string) => {
    try {
      await loginAPI(serial_id, password);

      // 로그인 성공 후 API에서 사용자 데이터 가져오기
      const response = await getUserBriefAPI();
      const { role, img_url, status } = response.data;

      // Enum 값으로 변환 후 저장
      const parsedRole = Role[role as keyof typeof Role] || Role.GUEST;
      const parsedStatus = UserStatus[status as keyof typeof UserStatus] || UserStatus.NONE;

      if (img_url) {
        localStorage.setItem('img_url', img_url);
      } else {
        localStorage.removeItem('img_url');
      }

      set({
        role: parsedRole,
        status: parsedStatus,
        img_url: img_url || null,
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log(error);
      }
      throw error;
    }
  },

  updateProfileImage: (imgUrl: string | null) => {
    if (imgUrl) {
      localStorage.setItem('img_url', imgUrl);
    } else {
      localStorage.removeItem('img_url');
    }

    set({ img_url: imgUrl || null });
  },

  // 로그아웃
  logout: async () => {
    try {
      await logoutAPI();
      toast('로그아웃 되었습니다.', {
        type: 'primary',
      });
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.log(error);
      }
    }
    localStorage.removeItem('img_url');
    localStorage.removeItem('idea_form');

    set({ role: Role.GUEST, status: null, img_url: null });
  },

  // 게스트로 초기화
  resetToGuest: () => {
    localStorage.removeItem('img_url');
    localStorage.removeItem('idea_form');

    set({ role: Role.GUEST, status: null, img_url: null });
  },

  // 쿼리에서 사용자 데이터 업데이트
  updateUserFromQuery: (data: UserBrief) => {
    const parsedRole = Role[data.role as keyof typeof Role] || Role.GUEST;
    const parsedStatus = UserStatus[data.status as keyof typeof UserStatus] || UserStatus.NONE;
    const parsedImgUrl = data.img_url || null;

    if (parsedImgUrl) {
      localStorage.setItem('img_url', parsedImgUrl);
    } else {
      localStorage.removeItem('img_url');
    }

    set({ role: parsedRole, status: parsedStatus, img_url: parsedImgUrl, isFetched: true });
  },
}));

export default useAuthStore;
