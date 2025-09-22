import { UpdateUserRequest, User } from '@/types';
import { apiRequest } from './apiRequest';

export const userService = {
  getUser: () => apiRequest<User>('/user'),
  updateUser: (userData: UpdateUserRequest) =>
    apiRequest<User>('/user', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
};
