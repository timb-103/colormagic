<template>
  <ClientOnly>
    <Transition name="slide-up">
      <div class="fixed bottom-0 right-0 flex justify-end mt-4 p-4">
        <UButton
          color="primary"
          :label="$t('nav.suggestIdea')"
          size="xl"
          @click="onClick()"
        />
      </div>
    </Transition>
  </ClientOnly>
</template>

<script setup lang="ts">
import { PlausibleEventName } from '~/layers/plausible/types';

function onClick(): void {
  void navigateTo('https://colormagic.canny.io', { external: true });
  sendPlausibleEvent(PlausibleEventName.FEEDBACK_BUTTON_FLOATING_CLICKED);
}
</script>
