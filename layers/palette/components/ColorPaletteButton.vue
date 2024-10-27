<template>
  <!-- using a nuxtlink because rel doesnt work in UButton... -->
  <NuxtLink
    class="inline-block px-2.5 py-1.5 w-full focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white aria-disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 dark:aria-disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
    :to="to"
    :rel="noFollow ? 'nofollow' : undefined"
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
  </NuxtLink>
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
  noFollow?: boolean
}

withDefaults(defineProps<Props>(), {
  to: undefined,
  loading: false,
  disabled: false,
  paletteId: undefined,
  isLiked: false,
  likesCount: undefined,
  canLike: undefined,
  noFollow: false
});
</script>
