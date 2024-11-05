/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery } from '@tanstack/vue-query';
import type { UserDto } from '../server/dtos/user.dto';

const USER_ROOT_KEY = 'user';

export function useUser() {
  return useQuery({
    queryKey: [USER_ROOT_KEY],
    queryFn: async () => {
      const headers = useRequestHeaders(['cookie']);

      return await $fetch<UserDto>('/api/user/get', { headers });
    },
    retry: false
  });
}
