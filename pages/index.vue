<template>
  <div>
    <!-- header-->
    <div class="mb-8">
      <!-- title -->
      <h1>
        {{ $t('home.title') }}
      </h1>

      <!-- description -->
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
      <!-- <p class="italic text-xs text-center">
        {{ count?.count.toLocaleString() ?? 0 }} color palettes generated
      </p> -->
    </UForm>

    <div class="my-4">
      <CarbonAds />
    </div>

    <!-- popular palettes -->
    <div class="mt-8">
      <h2 class="font-semibold text-lg">
        {{ $t('home.popularPalettes') }}
      </h2>
      <ExplorePalettes
        :tags="[]"
        :limit="6"
        :sort-by="PaletteSortBy.POPULAR"
        is-filters-hidden
        is-pagination-hidden
      />

      <div class="text-center mt-4">
        <UButton
          :to="localePath('/palette/explore')"
          title="Explore all palettes"
          trailing-icon="i-heroicons-arrow-right"
        >
          {{ $t('home.popularPalettes') }}
        </UButton>
      </div>
    </div>

    <!-- trending palettes -->
    <div class="mt-8">
      <h2 class="font-semibold text-lg">
        {{ $t('home.trendingPalettes') }}
      </h2>
      <ExplorePalettes
        :tags="[]"
        :limit="6"
        :sort-by="PaletteSortBy.TRENDING"
        is-filters-hidden
        is-pagination-hidden
      />

      <div class="text-center mt-4">
        <UButton
          :to="localePath(`/palette/explore?sort=${PaletteSortBy.TRENDING}`)"
          title="Explore all palettes"
          trailing-icon="i-heroicons-arrow-right"
        >
          {{ $t('home.trendingPalettes') }}
        </UButton>
      </div>
    </div>

    <!-- palettes -->
    <div class="mt-8">
      <h2 class="font-semibold text-lg">
        {{ $t('home.paletteTags') }}
      </h2>

      <ul class="grid sm:grid-cols-3 gap-4">
        <li
          v-for="(item, index) in getAllPaletteFilters().splice(0, 30)"
          :key="index"
        >
          <ColorPaletteButton
            :colors="item.palette"
            :name="$t(`colors.${item.id}`)"
            :to="localePath(`/palette/explore/${item.id}`)"
          />
        </li>
      </ul>

      <div class="text-center mt-4">
        <UButton
          :to="localePath('/palette/explore/tags')"
          title="Explore all palettes"
          trailing-icon="i-heroicons-arrow-right"
        >
          {{ $t('home.paletteTags') }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, type InferType, string } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
import { PaletteSortBy } from '~/layers/palette/types';

const { t } = useI18n();
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
// const { data: count, suspense } = usePaletteCount();

// await suspense();

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
