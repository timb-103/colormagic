<template>
  <div class="flex flex-col">
    <!-- hex color button -->
    <UTooltip text="Click to copy hex code">
      <UButton
        size="2xs"
        variant="ghost"
        color="gray"
        class="font-semibold"
        @click="copy(hex); onCopyHex(hex)"
      >
        {{ hex }}
      </UButton>
    </UTooltip>

    <!-- rgb color button -->
    <UTooltip text="Click to copy rgb code">
      <UButton
        size="2xs"
        variant="ghost"
        color="gray"
        class="font-semibold"
        @click="copy(rgbToString(hexToRgb(hex))); onCopyRgb(rgbToString(hexToRgb(hex)))"
      >
        {{ rgbToString(hexToRgb(hex)) }}
      </UButton>
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { PlausibleEventName } from '~/layers/plausible/types';

export interface Props {
  hex: string
}

defineProps<Props>();

const notifications = useNotifications();
const { copy } = useClipboard();

function onCopyHex(value: string): void {
  notifications.addSuccess(`Copied hex color code ${value}`);
  sendPlausibleEvent(PlausibleEventName.COLOR_PALETTE_COPIED_HEX);
}

function onCopyRgb(value: string): void {
  notifications.addSuccess(`Copied rgb color code ${value}`);
  sendPlausibleEvent(PlausibleEventName.COLOR_PALETTE_COPIED_RGB);
}
</script>
