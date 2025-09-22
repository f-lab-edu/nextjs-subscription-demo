import { userService } from '@/service/userService';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  return useQuery({
    queryKey: ['/api/user'],
    queryFn: userService.getUser,
    select: (response) => response.data,
  });
}
