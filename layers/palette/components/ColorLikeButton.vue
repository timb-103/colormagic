<template>
  <UButton
    icon="i-heroicons-heart"
    :size="size"
    :loading="isCreating || isDeleting"
    :color="isLiked ? 'primary' : 'white'"
    :label="likesCount !== undefined && likesCount > 0 ? likesCount.toString() : undefined"
    @click="isLiked ? onDeleteLike() : onCreateLike()"
  />
</template>

<script setup lang="ts">
import { PlausibleEventName } from '~/layers/plausible/types';

export interface Props {
  paletteId: string
  isLiked?: boolean
  likesCount?: number
  canLike?: boolean
  size?: '2xs' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  size: '2xs',
  isLiked: false,
  likesCount: undefined,
  canLike: undefined
});

const localePath = useLocalePath();

const notifications = useNotifications();
const { mutate: createLike, isPending: isCreating } = useOptimisticCreatePaletteLike();
const { mutate: deleteLike, isPending: isDeleting } = useOptimisticDeletePaletteLike();

function onCreateLike(): void {
  if (props.canLike !== true) {
    void navigateTo(localePath('/login'));
    return;
  }

  createLike({ id: props.paletteId }, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error liking palette.');
    }
  });

  sendPlausibleEvent(PlausibleEventName.LIKE_BUTTON_CLICKED);
}

function onDeleteLike(): void {
  if (props.canLike !== true) {
    void navigateTo(localePath('/login'));
    return;
  }

  deleteLike({ id: props.paletteId }, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error un-liking palette.');
    }
  });
}
</script>
