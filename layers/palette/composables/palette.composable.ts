/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import type { CreatePaletteInputDto } from '../server/dtos/palette.dto';
import type { PaletteModel } from '../models/palette.model';
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

      const session = useLocalStorage<Map<string, PaletteModel>>(
        'palettes:created',
        new Map(),
        { serializer: StorageSerializers.map }
      );

      session.value?.set(response.id, response);

      /** @description delete last if too many saved */
      if (session.value.size >= 100) {
        const oldestKey = session.value.keys().next().value;
        if (oldestKey !== undefined) {
          session.value.delete(oldestKey);
        }
      }

      sendPlausibleEvent(PlausibleEventName.COLOR_PALETTE_CREATED);

      return response;
    }
  });
}
