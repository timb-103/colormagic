<template>
  <div>
    <!-- header-->
    <div class="mb-8">
      <!-- title -->
      <h1>
        {{ $t('home.title') }}
      </h1>

      <!-- description-->
      <p class="text-xl font-medium mb-4 max-w-xl">
        {{ description }}
      </p>
    </div>

    <!-- form -->
    <UForm
      :state="state"
      :schema="FormSchema"
      class="space-y-4"
      @submit="onSubmit"
    >
      <!-- prompt -->
      <UFormGroup name="prompt">
        <UButtonGroup
          size="xl"
          class="w-full"
        >
          <UInput
            v-model="state.prompt"
            size="xl"
            class="w-full"
            :placeholder="$t('generate.placeholder')"
          />
          <UButton
            icon="i-heroicons-arrow-path"
            aria-label="Generate Sample Prompt"
            @click="generateSamplePrompt()"
          />
        </UButtonGroup>
      </UFormGroup>

      <!-- submit button -->
      <UButton
        type="submit"
        block
        size="xl"
        class="mt-4"
        color="primary"
        :label="$t('generate.label')"
        :loading="isPending"
      />
    </UForm>

    <!-- examples -->
    <div class="max-w-3xl mt-8">
      <p class="text-lg font-bold mb-4">
        {{ $t('home.exampleLabel') }}
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
            @click="onClickExample(item.text[getLocale(locale)])"
          >
            <span class="w-full flex rounded-lg relative overflow-hidden">
              <!-- color name label -->
              <span class="bottom-2 left-2 bg-white absolute rounded-md flex items-center gap-2 px-2 py-1 font-semibold text-sm">
                <UIcon name="i-heroicons-sparkles" />
                {{ item.text[getLocale(locale)] }}
              </span>

              <!-- colors -->
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

const { t, locale } = useI18n();
const localePath = useLocalePath();

const title = t('home.seoTitle');
const description = t('home.seoDescription');

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}/img/og.png`
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

function generateSamplePrompt(): void {
  const prompts = getSamplePrompt('en');
  state.value.prompt = prompts[Math.floor(Math.random() * prompts.length)];
}

function onSubmit(event: FormSubmitEvent<Form>): void {
  create({ prompt: event.data.prompt }, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error creating palette.');
    },
    onSuccess: (value) => {
      void navigateTo(localePath(`/palette/${value.id}`));
    }
  });
}

function onClickExample(prompt: string): void {
  create({ prompt }, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error creating palette.');
    },
    onSuccess: (value) => {
      void navigateTo(localePath(`/palette/${value.id}`));
    }
  });
}
</script>
