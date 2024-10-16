<template>
  <UBadge
    color="white"
    class="flex gap-1 items-center"
  >
    <UIcon name="i-heroicons-sparkles" />
    {{ name }}
  </UBadge>
</template>

<script setup lang="ts">
export interface Props {
  name: string
}

defineProps<Props>();
</script>
