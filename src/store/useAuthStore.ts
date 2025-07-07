import { create } from 'zustand';
import { getUserBriefAPI, loginAPI, logoutAPI } from '../api/auth';
import { Role, UserStatus } from '../constants/role';
import { toast } from '@goorm-dev/vapor-components';
import { clearAuthCookies } from '../utilities/deleteCookies';

// Enum 변환 유틸 함수
const parseEnumValue = <T extends Record<string, string>>(
  enumObj: T,
  value: string | null,
  defaultValue: T[keyof T],
) => {
  return Object.values(enumObj).includes(value as T[keyof T]) ? (value as T[keyof T]) : defaultValue;
};

interface AuthStore {
  role: Role;
  status: UserStatus | null;
  img_url: string | null;
  isFetched: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetToGuest: () => void;
  updateProfileImage: (imgUrl: string | null) => void;
  fetchUserStatus: () => Promise<void>;
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
      const parsedRole = parseEnumValue(Role, role, Role.GUEST);
      const parsedStatus = parseEnumValue(UserStatus, status, UserStatus.NONE);

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
      console.error('Login failed', error);
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
    let shouldClearCookies = false;

    try {
      await logoutAPI();
      toast('로그아웃 되었습니다.', {
        type: 'primary',
      });
    } catch (error: any) {
      console.warn('Logout error', error);
      shouldClearCookies = true;
    }

    if (shouldClearCookies) {
      clearAuthCookies();
      toast('로그아웃에 실패했습니다.', {
        type: 'danger',
      });
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

  // 사용자 상태 조회
  fetchUserStatus: async () => {
    try {
      const response = await getUserBriefAPI();
      const { role, img_url, status } = response.data;

      const parsedStatus = parseEnumValue(UserStatus, status, UserStatus.NONE);
      const parsedRole = parseEnumValue(Role, role, Role.GUEST);
      const parsedImgUrl = img_url || null;

      localStorage.setItem('img_url', parsedImgUrl);

      set({ status: parsedStatus, role: parsedRole, img_url: parsedImgUrl, isFetched: true });
    } catch (error) {
      console.error('Error fetching user status:', error);
      set({ isFetched: true });
      throw error;
    }
  },
}));

export default useAuthStore;
