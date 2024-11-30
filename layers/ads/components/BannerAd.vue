<template>
  <NuxtLink
    :to="to"
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    class="shadow-lg rounded-lg p-2 pr-4 bg-black flex gap-2 max-w-md hover:bg-default-black-800 border border-gray-600 group"
    @click="onClick()"
  >
    <img
      width="40px"
      height="40px"
      :src="logoUrl"
      class="w-10 h-10 bg-white border border-gray-200 p-1 rounded-lg flex-shrink-0 block group-hover:scale-110 group-hover:rotate-6 transition-all"
    >
    <p class="text-sm">
      <span class="font-semibold text-white mr-2">{{ name }}</span>
      <span class="text-gray-300 mr-2">{{ text }}</span>
      <span class="text-blue-300 group-hover:text-blue-400 underline">{{ cta }}</span>
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
import { PlausibleEventName } from '~/layers/plausible/types';

export interface Props {
  logoUrl: string
  name: string
  text: string
  to: string
  cta?: string
}

withDefaults(defineProps<Props>(), {
  cta: 'Start free trial'
});

function onClick(): void {
  sendPlausibleEvent(PlausibleEventName.STICKY_BOTTOM_AD_CLICKED);
}
</script>
