<template>
  <UButton
    class="w-full"
    :ui="{ rounded: 'rounded-xl'}"
    :loading="loading"
    :disabled="disabled"
  >
    <span class="w-full flex rounded-lg relative overflow-hidden">
      <!-- background image -->
      <img
        loading="lazy"
        :src="thumbnailUrl"
        class="w-full h-20 object-cover"
      >
    </span>
  </UButton>
</template>

<script setup lang="ts">
export interface Props {
  thumbnailUrl: string
  name: string
  loading?: boolean
  disabled?: boolean
}

defineProps<Props>();
</script>
