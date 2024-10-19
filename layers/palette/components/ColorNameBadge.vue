<template>
  <UBadge
    color="white"
    class="inline-flex items-center gap-1 truncate max-w-[90%]"
  >
    <UIcon name="i-heroicons-sparkles" />
    <span class="truncate">{{ name }}</span>
  </UBadge>
</template>

<script setup lang="ts">
export interface Props {
  name: string
}

defineProps<Props>();
</script>
