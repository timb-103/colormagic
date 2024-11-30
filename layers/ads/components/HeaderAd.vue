<template>
  <NuxtLink
    :to="to"
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    class="p-2 bg-black flex justify-center items-center gap-2 hover:bg-default-black-800 border border-gray-600 group w-full"
    @click="onClick()"
  >
    <img
      width="24px"
      height="24px"
      :src="logoUrl"
      class="w-6 h-6 bg-white border border-gray-200 p-1 rounded-lg flex-shrink-0 block group-hover:scale-110 group-hover:rotate-6 transition-all"
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
  sendPlausibleEvent(PlausibleEventName.HEADER_AD_CLICKED);
}
</script>
