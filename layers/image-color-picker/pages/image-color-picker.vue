<template>
  <div>
    <!-- header-->
    <div class="mb-8">
      <!-- title -->
      <h1>
        {{ $t('imageColorPicker.title') }}
      </h1>

      <!-- description-->
      <p class="text-xl font-medium mb-4 max-w-xl">
        {{ $t('imageColorPicker.seoDescription') }}
      </p>
    </div>

    <!-- form -->
    <UForm
      :state="state"
      :schema="FormSchema"
      class="space-y-4"
      @submit="onSubmit"
    >
      <!-- image -->
      <UFormGroup
        name="dataUrl"
        :label="$t('imageColorPicker.uploadPlaceholder')"
      >
        <img
          v-if="state.dataUrl !== ''"
          :src="state.dataUrl"
          class="w-full h-40 mb-4 object-contain bg-gray-200"
        >
        <UInput
          type="file"
          size="xl"
          accept="image/*"
          icon="i-heroicons-photo"
          @change="files = $event"
        />
      </UFormGroup>

      <!-- submit button -->
      <UButton
        type="submit"
        block
        size="xl"
        class="mt-4"
        color="primary"
        :label="$t('generate.label')"
        :loading="isPending || isFetchingImage"
      />
    </UForm>

    <!-- examples -->
    <div class="max-w-3xl mt-8">
      <p class="text-lg font-bold mb-4">
        {{ $t('home.exampleLabel') }}
      </p>
      <ul class="grid sm:grid-cols-3 gap-4">
        <li
          v-for="(item, index) in getSampleImages()"
          :key="index"
        >
          <ImageButton
            :thumbnail-url="item"
            :name="'dunno'"
            :disabled="isPending || isFetchingImage"
            @click="onClickExample(item)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, type InferType, string } from 'yup';
import { prominent } from 'color.js';
import type { FormSubmitEvent } from '#ui/types';

const { t } = useI18n();
const localePath = useLocalePath();

const title = t('imageColorPicker.seoTitle');
const description = t('imageColorPicker.seoDescription');

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}/img/og.png`
});

const notifications = useNotifications();
const { mutate: create, isPending } = useCreatePalette();

const files = ref<FileList>();
const isFetchingImage = ref(false);

const state = ref({
  prompt: '',
  dataUrl: ''
});

const FormSchema = object({
  prompt: string().required(),
  dataUrl: string().required()
});

export type Form = InferType<typeof FormSchema>;

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

async function onClickExample(thumbnailUrl: string): Promise<void> {
  isFetchingImage.value = true;

  const imageBase64 = await getImageBase64(thumbnailUrl);
  if (imageBase64 === null) {
    return;
  }

  const colors = await prominent(imageBase64, {
    amount: 5,
    format: 'hex'
  });

  create({ prompt: colors.toString() }, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error creating palette.');
    },
    onSuccess: (value) => {
      void navigateTo(localePath(`/palette/${value.id}`));
    }
  });

  isFetchingImage.value = false;
}

/** @description load the image preview */
watch(files, () => {
  if (files.value?.[0] !== undefined) {
    const reader = new FileReader();

    reader.onload = () => {
      state.value.dataUrl = reader.result as string;
      void prominent(state.value.dataUrl, { amount: 5, format: 'hex' }).then(colors => {
        if (colors.length > 0) {
          state.value.prompt = colors.toString();
        }
      });
    };

    reader.readAsDataURL(files.value[0]);
  } else {
    state.value.dataUrl = '';
  }
});
</script>
