/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery } from '@tanstack/vue-query';
import type { UserDto } from '../server/dtos/user.dto';

const USER_ROOT_KEY = 'user';
const USER_TTL = 60e3 * 10;

export function useUser() {
  return useQuery({
    queryKey: [USER_ROOT_KEY],
    queryFn: async () => {
      const headers = useRequestHeaders(['cookie']);

      return await $fetch<UserDto>('/api/user/get', { headers });
    },
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: USER_TTL,
    enabled: () => useCookie('jwt').value !== null && useCookie('jwt').value !== undefined
  });
}
