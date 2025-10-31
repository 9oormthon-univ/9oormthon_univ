// src/hooks/mutations/admin/useUnivMutations.ts

import { useMutation } from '@tanstack/react-query';
import { createUnivAPI, deleteUnivAPI, updateUnivAPI } from '@/api/admin/univs';
import { useQueryClient } from '@tanstack/react-query';

export const useCreateUnivMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, instagram_url }: { name: string; instagram_url: string }) =>
      createUnivAPI({ name, instagram_url }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['univList'] });
    },
  });
};

export const useUpdateUnivMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      univ_id,
      name,
      instagram_url,
      leader_id,
    }: {
      univ_id: number;
      name: string;
      instagram_url: string;
      leader_id: number;
    }) => updateUnivAPI(univ_id, name, instagram_url, leader_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['univDetail'] });
      queryClient.invalidateQueries({ queryKey: ['univList'] });
    },
  });
};

export const useDeleteUnivMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ univ_id }: { univ_id: number }) => deleteUnivAPI(univ_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['univList'] });
    },
  });
};
