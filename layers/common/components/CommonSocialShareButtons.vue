<template>
  <ul
    class="flex gap-1.5 bg-white"
    :class="{
      'flex-wrap': orientation === 'horizontal',
      'sm:flex-col': orientation === 'vertical'
    }"
  >
    <li
      v-for="(item, index) in links"
      :key="index"
    >
      <UButton
        :icon="item.icon"
        :to="item.to"
        variant="solid"
        target="_blank"
        :aria-label="item.label"
        @click="onClick()"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { PlausibleEventName } from '~/layers/plausible/types';

export interface Props {
  orientation?: 'vertical' | 'horizontal'
  type?: 'url' | 'text'
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  /** @description will always be horizontal on mobile */
  orientation: 'vertical',
  type: 'url',
  text: undefined
});

const { fullPath } = useRoute();
const url = `${useRuntimeConfig().public.siteUrl}${fullPath}`;

const textLinks = [
  {
    label: 'Facebook',
    icon: 'i-fa6-brands-facebook',
    to: `https://facebook.com/sharer/sharer.php?u=${url}&text=${props.text}`
  },
  {
    label: 'X',
    icon: 'i-fa6-brands-x-twitter',
    to: `https://twitter.com/intent/tweet?url=${url}&text=${props.text}`
  },
  {
    label: 'LinkedIn',
    icon: 'i-fa6-brands-linkedin',
    to: `https://linkedin.com/sharing/share-offsite/?url=${url}&text=${props.text}`
  },
  {
    label: 'Reddit',
    icon: 'i-fa6-brands-reddit',
    to: `https://reddit.com/submit?url=${url}&title=${props.text}`
  },
  {
    label: 'WhatsApp',
    icon: 'i-fa6-brands-whatsapp',
    to: `https://api.whatsapp.com/send?text=${props.text}${url}`
  },
  {
    label: 'Telegram',
    icon: 'i-fa6-brands-telegram',
    to: `https://t.me/share/url?url=${url}&text=${props.text}`
  },
  {
    label: 'Email',
    icon: 'i-heroicons-envelope',
    to: `mailto:?body=${props.text}${url}`
  }
];

const urlLinks = [
  {
    label: 'Facebook',
    icon: 'i-fa6-brands-facebook',
    to: `https://facebook.com/sharer/sharer.php?u=${url}`
  },
  {
    label: 'X',
    icon: 'i-fa6-brands-x-twitter',
    to: `https://x.com/intent/post?url=${url}`
  },
  {
    label: 'LinkedIn',
    icon: 'i-fa6-brands-linkedin',
    to: `https://linkedin.com/sharing/share-offsite/?url=${url}`
  },
  {
    label: 'Pinterest',
    icon: 'i-fa6-brands-pinterest',
    to: `https://pinterest.com/pin/create/button/?url=${url}`
  },
  {
    label: 'Reddit',
    icon: 'i-fa6-brands-reddit',
    to: `https://reddit.com/submit?url=${url}`
  },
  {
    label: 'WhatsApp',
    icon: 'i-fa6-brands-whatsapp',
    to: `https://api.whatsapp.com/send?text=${url}`
  },
  {
    label: 'Telegram',
    icon: 'i-fa6-brands-telegram',
    to: `https://t.me/share/url?url=${url}`
  },
  {
    label: 'Email',
    icon: 'i-heroicons-envelope',
    to: `mailto:?body=${url}`
  }
];

const links = computed(() => props.type === 'url' ? urlLinks : textLinks);

function onClick(): void {
  sendPlausibleEvent(PlausibleEventName.SOCIAL_SHARE_LINK_CLICKED);
}
</script>
