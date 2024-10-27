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
        v-for="([key, item]) in Array.from(session).reverse()"
        :key="key"
      >
        <ColorPaletteButton
          :colors="item.colors"
          :name="item.text"
          :to="localePath(`/palette/${key}`)"
          no-follow
        />
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
const localePath = useLocalePath();

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
