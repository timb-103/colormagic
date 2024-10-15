<template>
  <div>
    <div class="mb-8">
      <h1>
        Generate your ideal color palette
      </h1>
      <p class="text-xl font-medium mb-4 max-w-xl">
        {{ description }}
      </p>
    </div>

    <div>
      <UForm
        :state="state"
        :schema="FormSchema"
        class="space-y-4"
        @submit="onSubmit"
      >
        <!-- name -->
        <UFormGroup name="prompt">
          <UInput
            v-model="state.prompt"
            size="xl"
            placeholder="Enter keywords for image or mood of color"
          />
        </UFormGroup>

        <!-- submit button -->
        <UButton
          type="submit"
          block
          size="xl"
          class="mt-4"
          color="primary"
          label="Create Palette"
          :loading="isPending"
        />
      </UForm>
    </div>

    <!-- examples -->
    <div class="max-w-3xl mt-8">
      <p class="text-lg font-bold mb-4">
        Try an example:
      </p>
      <ul class="grid sm:grid-cols-3 gap-4">
        <li
          v-for="(item, index) in samplePalettes"
          :key="index"
        >
          <UButton
            class="w-full"
            :ui="{ rounded: 'rounded-xl'}"
            :disabled="isPending"
            @click="onClickExample(item.text.en)"
          >
            <span class="w-full flex rounded-lg relative overflow-hidden">
              <span class="bottom-2 left-2 bg-white absolute rounded-md flex items-center gap-2 px-2 py-1 font-semibold text-sm">
                <UIcon name="i-heroicons-sparkles" />
                {{ item.text.en }}
              </span>
              <span
                v-for="(color, colorIndex) in item.colors"
                :key="colorIndex"
                :style="{
                  'background': color
                }"
                class="w-full h-20 block"
              />
            </span>
          </UButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, type InferType, string } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
import { samplePalettes } from '~/layers/common/utils/sample-palettes.util';

const title = 'ColorMagic | AI Color Palette Generator';
const description = 'ColorMagic is a color palette generator with AI. Generate colors from keyword for image of color you enter.';

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImageUrl: '/img/og.png'
});

const notifications = useNotifications();
const { mutate: create, isPending } = useCreatePalette();

const state = ref({
  prompt: ''
});

const FormSchema = object({
  prompt: string().required()
});

export type Form = InferType<typeof FormSchema>;

function onSubmit(event: FormSubmitEvent<Form>): void {
  create(event.data.prompt, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error creating palette.');
    },
    onSuccess: (value) => {
      void navigateTo(`/palette/${value.id}`);
    }
  });
}

function onClickExample(prompt: string): void {
  create(prompt, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error creating palette.');
    },
    onSuccess: (value) => {
      void navigateTo(`/palette/${value.id}`);
    }
  });
}
</script>
