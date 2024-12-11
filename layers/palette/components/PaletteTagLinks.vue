<template>
  <ul class="flex flex-wrap gap-2">
    <li
      v-for="item in links.filter(v => v.id !== '')"
      :key="item.id"
    >
      <NuxtLink
        :to="item.to"
        :title="`${item.label} Color Palettes`"
        :aria-label="`${item.label} Color Palettes`"
        active-class="text-primary"
        class="font-medium text-sm hover:text-primary text-gray-400"
      >
        {{ item.label }}
      </NuxtLink>
    </li>
  </ul>
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
