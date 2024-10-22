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

      <!-- count of palettes generated -->
      <p class="italic text-xs text-center">
        {{ count?.count.toLocaleString() ?? 0 }} color palettes generated since yesterday
      </p>
    </UForm>

    <!-- palettes -->
    <div class="mt-8">
      <p class="text-lg font-bold mb-4">
        {{ $t('explore.seoDescription') }}
      </p>

      <ul class="grid sm:grid-cols-3 gap-4 mb-4">
        <li
          v-for="(item, index) in getAllPaletteFilters()"
          :key="index"
        >
          <ColorPaletteButton
            :id="item.id"
            :colors="item.palette"
            :name="item.label[getLocale(locale)]"
            :to="localePath(`/palette/explore/${item.id}`)"
            is-like-hidden
          />
        </li>
      </ul>

      <NuxtLink
        to="/palette/explore"
        class="font-medium text-sm hover:text-primary text-gray-400"
      >
        Explore more palettes
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, type InferType, string } from 'yup';
import type { FormSubmitEvent } from '#ui/types';

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
const { data: count, suspense } = usePaletteCount();

await suspense();

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
</script>
