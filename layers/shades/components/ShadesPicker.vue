<template>
  <div>
    <div
      :style="{background: color}"
      class="p-4"
    >
      <ClientOnly>
        <Sketch
          v-model="color"
          :preset-colors="shades"
          @update:model-value="item => update(item.hex as HexColor)"
        />
      </ClientOnly>
    </div>

    <h2 class="mt-8 font-semibold text-lg">
      {{ $t('shade.lighter', { color: tagsTranslated.join(' ').toLowerCase() }) }}
    </h2>

    <ul class="grid grid-cols-3 sm:grid-cols-6 mt-4 gap-1">
      <li
        v-for="(item, index) in lighterShades"
        :key="index"
      >
        <UTooltip
          text="Click to copy hex code"
          class="w-full flex flex-col"
        >
          <UButton
            size="2xs"
            color="gray"
            :style="{background: item}"
            class="aspect-[1/1] flex justify-start items-end rounded-md hover:p-2"
            :title="hexToName(item)"
            :aria-label="hexToName(item)"
            @click="copy(item); onCopyHex(item)"
          />
        </UTooltip>
        <p class="text-xs font-semibold">
          {{ hexToName(item) }}
        </p>
        <p class="text-xs font-semibold">
          {{ item }}
        </p>
      </li>
    </ul>

    <h2 class="mt-8 font-semibold text-lg">
      {{ $t('shade.darker', { color: tagsTranslated.join(' ').toLowerCase() }) }}
    </h2>

    <ul class="grid grid-cols-3 sm:grid-cols-6 mt-4 gap-1">
      <li
        v-for="(item, index) in darkerShades"
        :key="index"
      >
        <UTooltip
          text="Click to copy hex code"
          class="w-full flex flex-col"
        >
          <UButton
            size="2xs"
            color="gray"
            :style="{background: item}"
            class="aspect-[1/1] flex justify-start items-end rounded-md hover:p-2"
            :title="hexToName(item)"
            :aria-label="hexToName(item)"
            @click="copy(item); onCopyHex(item)"
          />
        </UTooltip>
        <p class="text-xs font-semibold">
          {{ hexToName(item) }}
        </p>
        <p class="text-xs font-semibold">
          {{ item }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { Sketch } from '@ckpack/vue-color';
import { PlausibleEventName } from '~/layers/plausible/types';

export type HexColor = `#${string}`;

export interface Props {
  shades: string[]
  tagsTranslated: string[]
}

const props = defineProps<Props>();
const color = ref(props.shades[0]);

const notifications = useNotifications();
const { copy } = useClipboard();

const darkerShades = computed(() => {
  const values = [];

  for (let i = -80; i < 0; i += 10) {
    values.push(
      arrangeColors([color.value], {
        brightness: i,
        saturation: 0,
        warmth: 0
      })[0]
    );
  }

  return values;
});

const lighterShades = computed(() => {
  const values = [];

  for (let i = 0; i < 100; i += 10) {
    values.push(
      arrangeColors([color.value], {
        brightness: i,
        saturation: 0,
        warmth: 0
      })[0]
    );
  }

  return values;
});

function update(hex: HexColor): void {
  color.value = hex;
}

function onCopyHex(value: string): void {
  notifications.addSuccess(`Copied hex color code ${value}`);
  sendPlausibleEvent(PlausibleEventName.COLOR_PALETTE_COPIED_HEX);
}
</script>
