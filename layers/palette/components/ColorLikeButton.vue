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
  size?: '2xs' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  size: '2xs',
  isLiked: false,
  likesCount: undefined
});

const notifications = useNotifications();
const { mutate: createLike, isPending: isCreating } = useCreatePaletteLike();
const { mutate: deleteLike, isPending: isDeleting } = useDeletePaletteLike();

function onCreateLike(): void {
  createLike({ id: props.paletteId }, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error liking palette.');
    }
  });

  sendPlausibleEvent(PlausibleEventName.LIKE_BUTTON_CLICKED);
}

function onDeleteLike(): void {
  deleteLike({ id: props.paletteId }, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error un-liking palette.');
    }
  });
}
</script>
