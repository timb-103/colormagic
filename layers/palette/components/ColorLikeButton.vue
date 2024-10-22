<template>
  <UButton
    icon="i-heroicons-heart"
    :size="size"
    @click="onClick()"
  />
</template>

<script setup lang="ts">
import { PlausibleEventName } from '~/layers/plausible/types';

export interface Props {
  id?: string
  size?: '2xs' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  id: undefined,
  size: '2xs'
});

const notifications = useNotifications();

function onClick(): void {
  notifications.addWarning('Like feature coming soon...');
  sendPlausibleEvent(PlausibleEventName.LIKE_BUTTON_CLICKED);
}
</script>
