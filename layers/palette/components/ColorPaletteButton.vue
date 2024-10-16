<template>
  <UButton
    class="w-full"
    :ui="{ rounded: 'rounded-xl'}"
    :to="to"
    :loading="loading"
    :disabled="disabled"
  >
    <span class="w-full flex rounded-lg relative overflow-hidden">
      <!-- name -->
      <ColorNameBadge
        :name="name"
        class="bottom-2 left-2 absolute"
      />

      <!-- colors -->
      <span
        v-for="(color, colorIndex) in colors"
        :key="colorIndex"
        :style="{
          'background': color
        }"
        class="w-full h-20 block"
      />
    </span>
  </UButton>
</template>

<script setup lang="ts">
export interface Props {
  colors: string[]
  name: string
  to?: string
  loading?: boolean
  disabled?: boolean
}

defineProps<Props>();
</script>
