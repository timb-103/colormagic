<template>
  <div>
    <div v-if="!data && !isError">
      <USkeleton class="w-full h-12" />
      <USkeleton class="w-full h-12 mt-4" />
    </div>

    <div v-else-if="data">
      <div>
        <!-- title -->
        <h1>{{ data?.text }}</h1>

        <!-- list of colors -->
        <ul class="flex overflow-hidden mb-4 sm:mb-8">
          <li
            v-for="(item, index) in colors"
            :key="index"
            class="w-full"
          >
            <!-- color button -->
            <div
              :style="{ background: item }"
              class="w-full h-48 relative"
            >
              <UTooltip
                :text="`Generate a ${ntc.name(item)[1].toString()} palette`"
                class="bottom-0 left-0 absolute p-2"
              >
                <UButton
                  size="2xs"
                  icon="i-heroicons-sparkles"
                  truncate
                  class="max-w-full"
                  :loading="isPending"
                  @click="onClickExample(ntc.name(item)[1].toString())"
                >
                  <span class="hidden sm:block">{{ ntc.name(item)[1].toString() }}</span>
                </UButton>
              </UTooltip>
            </div>

            <div class="border-l hidden sm:block border-r border-b py-2">
              <!-- hex color button -->
              <UTooltip text="Click to copy hex code">
                <UButton
                  size="2xs"
                  variant="ghost"
                  color="gray"
                  class="font-semibold"
                  @click="copy(item); onCopyHex(item)"
                >
                  {{ item }}
                </UButton>
              </UTooltip>

              <!-- rgb color button -->
              <UTooltip text="Click to copy rgb code">
                <UButton
                  size="2xs"
                  variant="ghost"
                  color="gray"
                  class="font-semibold"
                  @click="copy(rgbToString(hexToRgb(item))); onCopyRgb(rgbToString(hexToRgb(item)))"
                >
                  {{ rgbToString(hexToRgb(item)) }}
                </UButton>
              </UTooltip>
            </div>
          </li>
        </ul>

        <!-- mobile colors list -->
        <ul class="sm:hidden flex flex-col mb-4 divide-y">
          <li
            v-for="(item, index) in colors"
            :key="index"
            class="w-full items-center flex gap-2 py-1"
          >
            <!-- color button -->
            <div
              :style="{ background: item }"
              class="w-6 h-6 rounded-full relative"
            />

            <div class="flex flex-col">
              <!-- hex color button -->
              <UTooltip text="Click to copy hex code">
                <UButton
                  size="2xs"
                  variant="ghost"
                  color="gray"
                  class="font-semibold"
                  @click="copy(item); onCopyHex(item)"
                >
                  {{ item }}
                </UButton>
              </UTooltip>

              <!-- rgb color button -->
              <UTooltip text="Click to copy rgb code">
                <UButton
                  size="2xs"
                  variant="ghost"
                  color="gray"
                  class="font-semibold"
                  @click="copy(rgbToString(hexToRgb(item))); onCopyRgb(rgbToString(hexToRgb(item)))"
                >
                  {{ rgbToString(hexToRgb(item)) }}
                </UButton>
              </UTooltip>
            </div>
          </li>
        </ul>

        <!-- arrange sliders-->
        <!-- brightness -->
        <div>
          <p class="font-semibold text-sm">
            Brigthness
          </p>
          <URange
            v-model="brightness"
            :min="-100"
            :max="100"
          />
        </div>

        <!-- saturation -->
        <div>
          <p class="font-semibold text-sm">
            Saturation
          </p>
          <URange
            v-model="saturation"
            :min="-100"
            :max="100"
          />
        </div>

        <!-- warmth -->
        <div>
          <p class="font-semibold text-sm">
            Warmth
          </p>
          <URange
            v-model="warmth"
            :min="-100"
            :max="100"
          />
        </div>

        <!-- save form -->
        <!-- form -->
        <div
          v-if="brightness !== 0 || saturation !== 0 || warmth !== 0"
          class="mt-4"
        >
          <p class="text-base font-semibold">
            Save these colors as a new palette:
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
                placeholder="Enter name for new palette"
              />
            </UFormGroup>

            <!-- submit button -->
            <div class="flex gap-2 items-center">
              <UButton
                label="Reset"
                @click="resetArrange()"
              />
              <UButton
                type="submit"
                color="primary"
                label="Create Palette"
                :loading="isPending"
              />
            </div>
          </UForm>
        </div>

        <!-- share buttons -->
        <div class="mt-8">
          <p class="text-sm font-semibold mb-2">
            Share this palette to:
          </p>
          <CommonSocialShareButtons
            type="text"
            orientation="horizontal"
            :text="`I generated a color palette for ${data.text ?? ''} with ColorMagic AI!`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, type InferType, string } from 'yup';
import { useClipboard } from '@vueuse/core';
import type { FormSubmitEvent } from '#ui/types';
import ntc from '~/layers/palette/utils/ntc.util';
import { PlausibleEventName } from '~/layers/plausible/types';

const { params } = useRoute();
const id = ref(typeof params.id === 'string' ? params.id : undefined);

const { data, suspense, isError } = usePalette(id);
const { mutate: create, isPending } = useCreatePalette();
const notifications = useNotifications();
const { copy } = useClipboard();

await suspense();

const title = computed(() => `${data.value?.text ?? 'Loading...'} | ColorMagic | AI Color Palette Generator`);
const ogImageUrl = computed(() => (data.value !== undefined ? formatOgUrl(data.value.colors, data.value.text) : ''));
const description = 'ColorMagic is a color palette generator with AI. Generate colors from a keyword or image you enter.';

useSeoMeta({
  title,
  description,
  ogTitle: title.value,
  ogDescription: description,
  ogImageUrl,
  robots: {
    noindex: true
  }
});

const state = ref({
  name: ''
});

const FormSchema = object({
  name: string().required()
});

export type Form = InferType<typeof FormSchema>;

const brightness = ref(0);
const saturation = ref(0);
const warmth = ref(0);

const colors = computed(() =>
  data.value?.colors !== undefined
    ? arrangeColors(data.value.colors, {
      brightness: brightness.value,
      saturation: saturation.value,
      warmth: warmth.value
    })
    : []
);

function resetArrange(): void {
  brightness.value = 0;
  saturation.value = 0;
  warmth.value = 0;
}

function onSubmit(event: FormSubmitEvent<Form>): void {
  create({ prompt: event.data.name, colors: colors.value }, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error creating palette.');
    },
    onSuccess: (value) => {
      void navigateTo(`/palette/${value.id}`);
    }
  });
}

function onClickExample(prompt: string): void {
  create({ prompt }, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error creating palette.');
    },
    onSuccess: (value) => {
      notifications.addSuccess(`Successfully created ${prompt} palette.`);
      void navigateTo(`/palette/${value.id}`);
    }
  });
}

function onCopyHex(value: string): void {
  notifications.addSuccess(`Copied hex color code ${value}`);
  sendPlausibleEvent(PlausibleEventName.COLOR_PALETTE_COPIED_HEX);
}

function onCopyRgb(value: string): void {
  notifications.addSuccess(`Copied rgb color code ${value}`);
  sendPlausibleEvent(PlausibleEventName.COLOR_PALETTE_COPIED_RGB);
}
</script>
