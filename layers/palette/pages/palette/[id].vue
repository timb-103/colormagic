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
            v-for="(item, index) in arrangedColors"
            :key="index"
            class="w-full"
          >
            <div class="flex gap-2 items-center mb-1">
              <!-- color picker -->
              <ColorPicker
                :initial-color="item"
                @select="value => colors[index] = value"
              />

              <!-- reset color button -->
              <UButton
                v-if="colors[index] !== data.colors[index]"
                icon="i-heroicons-arrow-path"
                size="xs"
                @click="colors[index] = data.colors[index]"
              />
            </div>
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
              <ColorCopyButtons :hex="item" />
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

            <!-- copy color buttons -->
            <ColorCopyButtons :hex="item" />
          </li>
        </ul>

        <!-- arrange sliders-->
        <ColorArrangeSliders v-model="arrange" />

        <!-- save form -->
        <CreateColorPaletteFormCard
          v-if="hasChanges"
          :colors="arrangedColors"
          @reset="resetArrange()"
        />

        <!-- share buttons -->
        <div class="mt-8">
          <p class="text-sm font-semibold mb-2">
            {{ $t('palette.shareLabel') }}
          </p>
          <CommonSocialShareButtons
            type="text"
            orientation="horizontal"
            :text="`${t('palette.shareText')} ${data.text ?? ''} with ColorMagic AI!`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ntc from '~/layers/palette/utils/ntc.util';

const { params } = useRoute();
const id = ref(typeof params.id === 'string' ? params.id : undefined);

const { t } = useI18n();
const localePath = useLocalePath();
const { data, suspense, isError } = usePalette(id);
const { mutate: create, isPending } = useCreatePalette();
const notifications = useNotifications();

await suspense();

/** @description redirect home because old palettes will throw 404's otherwise */
if (data.value === undefined) {
  await navigateTo('/', { replace: true });
}

const title = computed(() => `${data.value?.text ?? 'Loading...'} - ${t('palette.seoTitle')}`);
const ogImageUrl = computed(() => (data.value !== undefined ? formatOgUrl(data.value.colors, data.value.text) : ''));
const description = t('palette.seoDescription');

useSeoMeta({
  title,
  description,
  ogTitle: title.value,
  ogDescription: description,
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}${ogImageUrl.value}`,
  robots: {
    noindex: true
  }
});

const colors = ref<string[]>([]);

const arrange = ref({
  brightness: 0,
  saturation: 0,
  warmth: 0
});

const hasChanges = computed(() => {
  return arrange.value.brightness !== 0 ||
  arrange.value.saturation !== 0 ||
  arrange.value.warmth !== 0 ||
  (data.value !== undefined && JSON.stringify(data.value.colors) !== JSON.stringify(colors.value));
});

const arrangedColors = computed(() => arrangeColors(colors.value, {
  brightness: arrange.value.brightness,
  saturation: arrange.value.saturation,
  warmth: arrange.value.warmth
}));

function resetArrange(): void {
  arrange.value.brightness = 0;
  arrange.value.saturation = 0;
  arrange.value.warmth = 0;

  if (data.value?.colors !== undefined) {
    colors.value = [...data.value.colors];
  }
}

function onClickExample(prompt: string): void {
  create({ prompt }, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error creating palette.');
    },
    onSuccess: (value) => {
      notifications.addSuccess(`Successfully created ${prompt} palette.`);
      void navigateTo(localePath(`/palette/${value.id}`));
    }
  });
}

watch(data, (newValue) => {
  if (newValue !== undefined) {
    colors.value = [...newValue.colors];
  }
}, { immediate: true });
</script>
