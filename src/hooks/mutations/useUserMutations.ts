// src/hooks/mutations/useUserMutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo } from '@/api/users';
import { UserInfo } from '@/types/user/users';

// 유저 정보 수정
export const useUpdateUserInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UserInfo, Error, UserInfo>({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
