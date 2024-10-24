/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery } from '@tanstack/vue-query';
import type { UserDto } from '../server/dtos/user.dto';

const USER_ROOT_KEY = 'user';

export function useUser() {
  const jwt = computed(() => useCookie('jwt'));

  return useQuery({
    queryKey: [USER_ROOT_KEY],
    queryFn: async () => {
      return await $fetch<UserDto>('/api/user/get');
    },
    enabled: () => jwt.value !== undefined
  });
}
