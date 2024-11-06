<template>
  <div class="fixed bottom-0 right-0 mt-4 p-4 ">
    <div
      class="flex justify-end gap-2"
    >
      <!-- github star button -->
      <UButton
        label="Star on GitHub"
        icon="i-fa6-brands-github"
        size="lg"
        @click="onClick()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlausibleEventName } from '~/layers/plausible/types';

function onClick(): void {
  void navigateTo('https://github.com/timb-103/colormagic', { external: true });
  sendPlausibleEvent(PlausibleEventName.GITHUB_BUTTON_FLOATING_CLICKED);
}
</script>
