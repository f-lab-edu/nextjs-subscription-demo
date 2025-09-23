import { userService } from '@/service/userService';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useUser() {
  return useSuspenseQuery({
    queryKey: ['/api/user'],
    queryFn: userService.getUser,

    select: (response) => {
      if (!response.data) {
        throw new Error('사용자 정보를 찾을 수 없습니다');
      }
      return response.data;
    },
  });
}
