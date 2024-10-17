<template>
  <ClientOnly>
    <Transition name="slide-up">
      <div class="sticky bottom-0 flex justify-end mt-8">
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
