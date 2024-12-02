<template>
  <div>
    <div v-if="!data && !isError">
      <USkeleton class="w-full h-12" />
      <USkeleton class="w-full h-12 mt-4" />
    </div>

    <div v-else-if="data">
      <div>
        <!-- tag links -->
        <div class="mb-2">
          <PaletteTagLinks :links="paletteTagLinks" />
        </div>

        <!-- title -->
        <div class="flex gap-4 flex-wrap flex-row justify-between sm:items-center mb-4">
          <h1 class="mb-0">
            {{ data?.text }}
          </h1>

          <!-- save button -->
          <div
            v-if="hasChanges"
            class="flex items-center gap-2"
          >
            <UButton
              :label="$t('palette.resetLabel')"
              @click="resetArrange()"
            />
            <UButton
              type="submit"
              color="primary"
              :label="$t('palette.saveLabel')"
              :loading="isCloning"
              @click="onSave()"
            />
          </div>
          <div v-else>
            <ColorLikeButton
              :is-liked="data.isLiked === true"
              :likes-count="data.likesCount"
              :can-like="user?.id !== undefined"
              size="md"
              :palette-id="data.id"
            />
          </div>
        </div>

        <!-- list of colors -->
        <div class="overflow-hidden mb-4 rounded-xl border border-gray-200 divide-x">
          <!-- colors -->
          <ul class="flex">
            <li
              v-for="(item, index) in arrangedColors"
              :key="index"
              class="w-full relative"
            >
              <!-- color button -->
              <div
                :style="{ background: item }"
                class="w-full h-48 relative"
              >
                <UTooltip
                  :text="`Generate a ${ntc.name(item)[1].toString()} palette`"
                  class="bottom-0 left-0 absolute p-2 w-full"
                >
                  <UButton
                    size="2xs"
                    icon="i-heroicons-sparkles"
                    truncate
                    class="max-w-[90%]"
                    :loading="isCreating"
                    @click="onClickExample(`${ntc.name(item)[1].toString()} (${ntc.name(item)[0]})`)"
                  >
                    <span class="hidden sm:block truncate">{{ ntc.name(item)[1].toString() }}</span>
                  </UButton>
                </UTooltip>
              </div>
            </li>
          </ul>

          <!-- color codes -->
          <ul class="hidden sm:flex divide-x">
            <li
              v-for="(item, index) in arrangedColors"
              :key="index"
              class="w-full relative"
            >
              <div class="py-2">
                <div class="flex gap-2 items-center mb-1 ml-2">
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

                <ColorCopyButtons :hex="item" />
              </div>
            </li>
          </ul>
        </div>

        <!-- mobile colors list -->
        <ul class="sm:hidden flex flex-col mb-2 divide-y">
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
        <div class="border border-gray-200 rounded-xl p-4">
          <ColorArrangeSliders v-model="arrange" />
        </div>

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

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { data, suspense, isError } = usePalette(id);
const { mutate: clone, isPending: isCloning } = useClonePalette();
const { mutate: create, isPending: isCreating } = useCreatePalette();
const notifications = useNotifications();

await suspense();

const { data: user } = useUser();

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

const paletteTagLinks = getAllPaletteFilters().map(v => ({
  label: v.label[getLocale(locale.value)],
  id: v.id,
  to: localePath(`/palette/explore/${v.id}`)
})).filter(v => data.value?.tags.includes(v.id));

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

function onSave(): void {
  if (data.value?.id === undefined) {
    return;
  }

  clone({ id: data.value?.id, colors: arrangedColors.value }, {
    onError: (err) => {
      notifications.addError(err.message ?? 'Error cloning palette.');
    },
    onSuccess: (value) => {
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
