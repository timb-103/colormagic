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
        class="bottom-1 left-1 absolute"
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

      <!-- like button -->
      <div
        v-if="paletteId"
        @click.prevent
      >
        <ColorLikeButton
          :palette-id="paletteId"
          :is-liked="isLiked"
          :likes-count="likesCount"
          :can-like="canLike"
          class="absolute bottom-1 right-1"
        />
      </div>
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
  paletteId?: string
  isLiked?: boolean
  likesCount?: number
  canLike?: boolean
}

withDefaults(defineProps<Props>(), {
  to: undefined,
  loading: false,
  disabled: false,
  paletteId: undefined,
  isLiked: false,
  likesCount: undefined,
  canLike: undefined
});
</script>
