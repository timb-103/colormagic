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
        <ul class="flex overflow-hidden mb-8">
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
                  :label="ntc.name(item)[1].toString()"
                  truncate
                  class="max-w-full"
                />
              </UTooltip>
            </div>

            <div class="border-l border-r border-b py-2">
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

        <!-- share buttons -->
        <div class="mb-8">
          <p class="text-sm font-semibold mb-2">
            Share this palette to:
          </p>
          <CommonSocialShareButtons
            type="text"
            orientation="horizontal"
            :text="`I generated a color palette for ${data.text ?? ''} with ColorMagic AI!`"
          />
        </div>

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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import ntc from '~/layers/palette/utils/ntc.util';
import { PlausibleEventName } from '~/layers/plausible/types';

const { params } = useRoute();
const id = ref(typeof params.id === 'string' ? params.id : undefined);

const { data, suspense, isError } = usePalette(id);
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

function onCopyHex(value: string): void {
  notifications.addSuccess(`Copied hex color code ${value}`);
  sendPlausibleEvent(PlausibleEventName.COLOR_PALETTE_COPIED_HEX);
}

function onCopyRgb(value: string): void {
  notifications.addSuccess(`Copied rgb color code ${value}`);
  sendPlausibleEvent(PlausibleEventName.COLOR_PALETTE_COPIED_RGB);
}
</script>
