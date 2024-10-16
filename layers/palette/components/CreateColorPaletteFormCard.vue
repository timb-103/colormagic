<template>
  <UCard class="mt-4">
    <p class="text-base font-semibold">
      {{ $t('palette.saveLabel') }}
    </p>
    <UForm
      :state="state"
      :schema="FormSchema"
      class="space-y-4"
      @submit="onSubmit"
    >
      <!-- prompt -->
      <UFormGroup name="name">
        <UInput
          v-model="state.name"
          :placeholder="$t('palette.createPlaceholder')"
        />
      </UFormGroup>

      <!-- submit button -->
      <div class="flex gap-2 items-center">
        <UButton
          :label="$t('palette.resetLabel')"
          @click="$emit('reset')"
        />
        <UButton
          type="submit"
          color="primary"
          :label="$t('palette.createLabel')"
          :loading="isPending"
        />
      </div>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import { object, type InferType, string } from 'yup';
import type { FormSubmitEvent } from '#ui/types';

export interface Props {
  colors: string[]
}

defineEmits<(e: 'reset') => void>();

const props = defineProps<Props>();

const localePath = useLocalePath();
const { mutate: create, isPending } = useCreatePalette();
const notifications = useNotifications();

const FormSchema = object({
  name: string().required()
});

export type Form = InferType<typeof FormSchema>;

const state = ref<Form>({
  name: ''
});

function onSubmit(event: FormSubmitEvent<Form>): void {
  create({ prompt: event.data.name, colors: props.colors }, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error creating palette.');
    },
    onSuccess: (value) => {
      void navigateTo(localePath(`/palette/${value.id}`));
    }
  });
}
</script>
