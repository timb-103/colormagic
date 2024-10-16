<template>
  <div>
    <p class="text-lg font-bold mb-4">
      {{ $t('recent.topLabel') }}
    </p>
    <ul
      v-if="session.size"
      class="grid sm:grid-cols-3 gap-4"
    >
      <li
        v-for="([key, item]) in Array.from(session)"
        :key="key"
      >
        <UButton
          class="w-full"
          :ui="{ rounded: 'rounded-xl'}"
          :to="`/palette/${key}`"
        >
          <span class="w-full flex rounded-lg relative overflow-hidden">
            <!-- color name label -->
            <span class="bottom-2 left-2 bg-white absolute rounded-md flex items-center gap-2 px-2 py-1 font-semibold text-sm">
              <UIcon name="i-heroicons-sparkles" />
              {{ item.text }}
            </span>

            <!-- colors -->
            <span
              v-for="(color, colorIndex) in item.colors"
              :key="colorIndex"
              :style="{
                'background': color
              }"
              class="w-full h-20 block"
            />
          </span>
        </UButton>
      </li>
    </ul>

    <p v-else>
      {{ $t('recent.noneFound') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import type { PaletteModel } from '~/layers/palette/models/palette.model';
const { t } = useI18n();

useSeoMeta({
  title: t('recent.seoTitle'),
  description: t('home.seoDescription')
});

const session = useLocalStorage<Map<string, PaletteModel>>(
  'palettes:created',
  new Map(),
  { serializer: StorageSerializers.map }
);
</script>
