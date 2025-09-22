import { userService } from '@/service/userService';
import { UpdateUserRequest } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UpdateUserRequest) => userService.updateUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api/user'] });
    },
    onError: (error) => {
      console.error('사용자 정보 업데이트 실패', error);
    },
  });
}
