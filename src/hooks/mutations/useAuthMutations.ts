// src/hooks/mutations/useLogin.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginAPI, logoutAPI } from '@/api/auth';
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { serial_id: string; password: string }) => loginAPI(data.serial_id, data.password),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      await queryClient.invalidateQueries({ queryKey: ['period'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem('img_url');
      localStorage.removeItem('idea_form');
    },
  });
};
