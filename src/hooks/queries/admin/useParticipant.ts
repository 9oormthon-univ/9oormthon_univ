// src/hooks/queries/admin/useParticipant.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createUserAPI,
  deleteUserAPI,
  resetPasswordAPI,
  updateUserAPI,
  fetchUserSummaryListAPI,
} from '@/api/admin/users';
import { Sorting, SortType } from '@/types/admin/user';
import { UserForm } from '@/types/admin/member';
import { mockIfDev } from '@/utilities/devMock';
import { mockParticipantList } from '@/constants/mockData';

export const useParticipant = (
  page: number,
  size: number,
  univId?: number,
  sorting?: Sorting,
  sortType?: SortType,
  search?: string,
) => {
  const query = useQuery({
    queryKey: ['participant', { page, size, univId, sorting, sortType, search }],
    queryFn: mockIfDev(() => fetchUserSummaryListAPI(page, size, univId, search, sorting, sortType), mockParticipantList),
    staleTime: 60 * 1000,
  });
  return query;
};

// 유저 생성 mutation
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserForm) => createUserAPI(userData),
    onSuccess: () => {
      // participant 관련 쿼리 무효화하여 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['participant'] });
    },
  });
};

// 유저 삭제 mutation
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => deleteUserAPI(userId),
    onSuccess: () => {
      // participant 관련 쿼리 무효화하여 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['participant'] });
    },
  });
};

// 비밀번호 초기화 mutation
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (userId: number) => resetPasswordAPI(userId),
  });
};

// 유저 수정 mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      user_id,
      univ_id,
      name,
      email,
      phone_number,
      generations,
      img_url,
    }: {
      user_id: number;
      univ_id: number;
      name: string;
      email: string;
      phone_number: string;
      generations: number[];
      img_url?: string;
    }) => {
      return updateUserAPI(user_id, univ_id, name, email, phone_number, generations, img_url);
    },
    onSuccess: () => {
      // participant 관련 쿼리 무효화하여 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['participant'] });
    },
  });
};
