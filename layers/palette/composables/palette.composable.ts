/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/vue-query';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import type { ClonePaletteInputDto, CreatePaletteInputDto, CreatePaletteLikeInputDto, DeletePaletteLikeInputDto, ListPaletteDto, ListPaletteInputDto, ListPaletteLikesDto, PaletteLikeDto } from '../server/dtos/palette.dto';
import type { PaletteModel } from '../models/palette.model';
import { PlausibleEventName } from '~/layers/plausible/types';
import { sendPlausibleEvent } from '~/layers/plausible/utils/plausible.util';

const PALETTE_ROOT_KEY = 'palette';

export function addPaletteToStorage(palette: PaletteModel): void {
  const session = useLocalStorage<Map<string, PaletteModel>>(
    'palettes:created',
    new Map(),
    { serializer: StorageSerializers.map }
  );

  session.value?.set(palette.id, palette);

  /** @description delete last if too many saved */
  if (session.value.size >= 100) {
    const oldestKey = session.value.keys().next().value;
    if (oldestKey !== undefined) {
      session.value.delete(oldestKey);
    }
  }
}

export function usePalette(id: Ref<string | undefined>) {
  return useQuery({
    queryKey: [PALETTE_ROOT_KEY, id],
    queryFn: async () => {
      return await $fetch<PaletteModel>(`/api/palette/${id.value}`);
    }
  });
}

export function useListPalettes(size: number = 10, filter?: ListPaletteInputDto['filter']) {
  return useInfiniteQuery({
    queryKey: [PALETTE_ROOT_KEY, size, filter],
    queryFn: async ({ pageParam: page = 0 }) => {
      return await $fetch('/api/palette/list', {
        method: 'POST',
        body: {
          page,
          size,
          filter
        }
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.items.length < size) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    }
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

      addPaletteToStorage(response);
      sendPlausibleEvent(PlausibleEventName.COLOR_PALETTE_CREATED);

      return response;
    }
  });
}

export function useClonePalette() {
  return useMutation({
    mutationFn: async (params: ClonePaletteInputDto) => {
      const response = await $fetch('/api/palette/clone', {
        method: 'POST',
        body: {
          id: params.id,
          colors: params.colors
        }
      });

      addPaletteToStorage(response);
      sendPlausibleEvent(PlausibleEventName.COLOR_PALETTE_CREATED);

      return response;
    }
  });
}

export function usePaletteCount() {
  return useQuery({
    queryKey: [PALETTE_ROOT_KEY, 'count'],
    queryFn: async () => {
      return await $fetch('/api/palette/count');
    }
  });
}

export function usePaletteLike(paletteId: Ref<string | undefined>) {
  return useQuery({
    queryKey: [PALETTE_ROOT_KEY, paletteId, 'like'],
    queryFn: async () => {
      return await $fetch<PaletteLikeDto>(`/api/palette/like/${paletteId.value}`);
    }
  });
}

export function useListPaletteLikesByIds(paletteIds: ComputedRef<string[]>) {
  return useQuery({
    queryKey: [PALETTE_ROOT_KEY, paletteIds],
    queryFn: async () => {
      const response = await $fetch<ListPaletteLikesDto>('/api/palette/like/list-by-palette-ids', {
        method: 'POST',
        body: {
          paletteIds: paletteIds.value
        }
      });

      return response.items;
    },
    enabled: () => paletteIds.value.length > 0
  });
}

export function useCreatePaletteLike() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreatePaletteLikeInputDto) => {
      const response = await $fetch(`/api/palette/like/${params.id}`, {
        method: 'PUT'
      });

      await client.invalidateQueries({
        queryKey: [PALETTE_ROOT_KEY]
      });

      return response;
    }
  });
}

export function useDeletePaletteLike() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (params: DeletePaletteLikeInputDto) => {
      await $fetch(`/api/palette/like/${params.id}`, {
        method: 'DELETE'
      });

      await client.invalidateQueries({
        queryKey: [PALETTE_ROOT_KEY]
      });
    }
  });
}

export function useListPalettesByLiked(size: number = 10) {
  return useInfiniteQuery({
    queryKey: [PALETTE_ROOT_KEY, size, 'liked'],
    queryFn: async ({ pageParam: page = 0 }) => {
      const response = await $fetch('/api/palette/like/list', {
        method: 'POST',
        body: {
          page,
          size
        }
      });

      const palettes = await $fetch<ListPaletteDto>('/api/palette/list-by-ids', {
        method: 'POST',
        body: {
          paletteIds: response.items
        }
      });

      return palettes.items;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < size) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    retry: 0
  });
}
