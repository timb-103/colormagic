<template>
  <div class="flex flex-wrap gap-2">
    <!-- languages -->
    <NuxtLink
      v-for="item in links"
      :key="item.id"
      :to="item.to"
      class="font-medium text-sm hover:text-primary text-gray-400"
    >
      {{ item.label }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  links: Array<{
    label: string
    id: string
    to: string
  }>
}

defineProps<Props>();
</script>
