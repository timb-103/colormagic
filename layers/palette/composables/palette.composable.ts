/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMutation, useQuery } from '@tanstack/vue-query';
import type { CreatePaletteInputDto } from '../server/dtos/palette.dto';
import { PlausibleEventName } from '~/layers/plausible/types';
import { sendPlausibleEvent } from '~/layers/plausible/utils/plausible.util';

const PALETTE_ROOT_KEY = 'palette';

export function usePalette(id: Ref<string | undefined>) {
  return useQuery({
    queryKey: [PALETTE_ROOT_KEY, id],
    queryFn: async () => {
      return await $fetch('/api/palette/get', {
        method: 'POST',
        body: {
          id: id.value
        }
      });
    },
    enabled: () => id.value !== undefined
  });
}

export function useCreatePalette() {
  return useMutation({
    mutationFn: async (params: CreatePaletteInputDto) => {
      const response = await $fetch('/api/palette/create', {
        method: 'POST',
        body: {
          prompt: params.prompt,
          colors: params.colors
        }
      });

      sendPlausibleEvent(PlausibleEventName.COLOR_PALETTE_CREATED);

      return response;
    }
  });
}
