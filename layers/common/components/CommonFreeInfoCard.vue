<template>
  <UCard>
    <template #header>
      <p class="font-semibold">
        ColorMagic is now 100% free to use!
      </p>
    </template>
    <p class="mb-4">
      We've just acquired this tool from the previous owners and have decided to make it 100% free to use.
    </p>
    <p class="mb-4">
      If you were a previous subscriber, we've canceled your subscription so there will be no more payments. If you
      require a prorated refund please reach out to us on <a
        class="text-primary underline"
        href="mailto:hello@colormagic.app"
      >hello@colormagic.app</a>.
    </p>
    <p>
      We're going to be making some improvements over the coming future, as well as adding other
      cool free tools for you to use. If you have any suggestions, we'd love to hear them!
    </p>
    <template #footer>
      <div class="flex justify-end">
        <UButton
          label="Close"
          @click="$emit('cancel')"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
defineEmits<(e: 'cancel') => void>();
</script>
