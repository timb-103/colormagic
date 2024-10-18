<template>
  <ClientOnly>
    <Transition name="slide-up">
      <div class="fixed bottom-0 right-0 flex justify-end mt-4 p-4">
        <UButton
          label="Star on GitHub"
          icon="i-fa6-brands-github"
          size="lg"
          @click="onClick()"
        />
      </div>
    </Transition>
  </ClientOnly>
</template>

<script setup lang="ts">
import { PlausibleEventName } from '~/layers/plausible/types';

function onClick(): void {
  void navigateTo('https://github.com/timb-103/colormagic', { external: true });
  sendPlausibleEvent(PlausibleEventName.GITHUB_BUTTON_FLOATING_CLICKED);
}
</script>
