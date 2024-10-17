<template>
  <ClientOnly>
    <Transition name="slide-up">
      <div class="fixed bottom-0 right-0 flex justify-end mt-4 p-4">
        <UButton
          color="primary"
          label="Donate"
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
  void navigateTo(useRuntimeConfig().public.stripeDonatePaymentUrl, { external: true });
  sendPlausibleEvent(PlausibleEventName.DONATE_BUTTON_FLOATING_CLICKED);
}
</script>
