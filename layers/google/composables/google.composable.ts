/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { GoogleAuthInputDto, GoogleAuthUrlInputDto } from '../server/dtos/google.dto';

export function useGoogleAuthRedirect() {
  return useMutation({
    mutationFn: async (params: GoogleAuthUrlInputDto) => {
      const response = await $fetch('/api/google/auth/get-url', {
        method: 'POST',
        body: {
          state: params.state
        }
      });

      await navigateTo(response.url, { external: true });
    },
    retry: false
  });
}

export function useGoogleAuthLogin() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (params: GoogleAuthInputDto) => {
      await $fetch('/api/auth/google/login', {
        method: 'POST',
        body: {
          code: params.code
        }
      });

      /** @description invalidate everything */
      await client.invalidateQueries();
    },
    retry: false
  });
}
