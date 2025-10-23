// src/store/useAuthStore.ts

import { UserBrief } from '@/types/user/users';
import { create } from 'zustand';

interface AuthStore {
  user: UserBrief | null;
  setUser: (user: UserBrief | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: UserBrief | null) => set({ user }),
}));
