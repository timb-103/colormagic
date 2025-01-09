<template>
  <div>
    <div v-if="!data && !isError">
      <USkeleton class="w-full h-12" />
      <USkeleton class="w-full h-12 mt-4" />
    </div>

    <div
      v-else-if="data"
      class="flex gap-8"
    >
      <div class="items-start hidden sm:flex">
        <div class="sticky top-8">
          <CommonSocialShareButtons
            type="text"
            orientation="vertical"
            :text="`${t('palette.shareText')} ${data.text ?? ''} with ColorMagic AI!`"
          />
        </div>
      </div>

      <div class="w-full">
        <div class="mb-4">
          <CarbonAds />
        </div>

        <!-- tag links -->
        <div class="mb-2">
          <PaletteTagLinks :links="paletteTagLinks" />
        </div>

        <!-- title -->
        <div class="flex gap-4 flex-wrap flex-row justify-between sm:items-center mb-4">
          <h1 class="mb-0">
            {{ data?.text }}
          </h1>

          <div>
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

          <!-- save button -->
          <div
            v-if="hasChanges"
            class="flex items-center gap-2 mt-2 justify-end"
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
        </div>

        <!-- share buttons -->
        <div class="mt-8 sm:hidden">
          <p class="text-sm font-semibold mb-2">
            {{ $t('palette.shareLabel') }}
          </p>
          <CommonSocialShareButtons
            type="text"
            orientation="horizontal"
            :text="`${t('palette.shareText')} ${data.text ?? ''} with ColorMagic AI!`"
          />
        </div>

        <!-- download landscape PNG -->
        <div class="mt-8">
          <h2 class="font-semibold text-lg capitalize">
            {{ $t('palette.png', { name: data?.text }) }}
          </h2>

          <img
            loading="lazy"
            :src="landscapeImageUrl"
            class="rounded-xl"
            :alt="`Download ${data?.text.toLowerCase()} color palette PNG image (landscape)`"
          >

          <img
            loading="lazy"
            :src="squareImageUrl"
            class="rounded-xl max-w-md w-full mt-4"
            :alt="`Download ${data?.text.toLowerCase()} color palette PNG image (square)`"
          >
        </div>

        <!-- CSS -->
        <div class="mt-8">
          <h2 class="font-semibold text-lg capitalize">
            {{ $t('palette.css', { name: data?.text }) }}
          </h2>

          <ColorPaletteCss :colors="data.colors" />
        </div>

        <!-- Grdadient background CSS -->
        <div class="mt-8">
          <h2 class="font-semibold text-lg capitalize">
            {{ $t('palette.gradientCss', { name: data?.text }) }}
          </h2>

          <ColorPaletteGradientCss :colors="data.colors" />
        </div>

        <!-- similar palettes -->
        <div
          v-if="data?.tags.length > 0"
          class="mt-8"
        >
          <h2 class="font-semibold text-lg capitalize">
            {{ $t('palette.similar') }}
          </h2>

          <ExplorePalettes
            :tags="data.tags.slice(0, 2)"
            :limit="9"
            is-filters-hidden
            is-pagination-hidden
          />
        </div>

        <!-- related shades -->
        <ExploreRelatedShadesLinks
          v-if="shadeTags.length > 0"
          :tags="shadeTags"
          class="mt-8"
        />
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
const { mutate: clone, isPending: isCloning } = useClonePalette();
const { mutate: create, isPending: isCreating } = useCreatePalette();
const notifications = useNotifications();

await suspense();

const { data: user } = useUser();

/** @description redirect home because old palettes will throw 404's otherwise */
if (data.value === undefined) {
  await navigateTo('/', { replace: true });
}

const title = computed(() => t('palette.seoTitle', {
  name: data.value?.text ?? 'Loading...'
}));

const landscapeImageUrl = `${useRuntimeConfig().public.siteUrl}/api/image/id/${id.value}`;
const squareImageUrl = `${useRuntimeConfig().public.siteUrl}/api/image/id/${id.value}?width=1080&height=1080`;

const description = t('palette.seoDescription', {
  name: data.value?.text.toLowerCase().trim() ?? 'Loading...',
  colors: data.value?.colors
    .map(v => `${ntc.name(v)[1].toString().toLowerCase()} ${v}`)
    .join(', ') ?? ''
});

useSeoMeta({
  title,
  description,
  ogTitle: title.value,
  ogDescription: description,
  ogImageUrl: landscapeImageUrl
});

const shadeTags = getShadeTags()
  .map(v => v.split('-'))
  .flat()
  .filter(v => data.value?.tags.some(y => y === v))
  .filter(v => v !== undefined);

const paletteTagLinks = getAllPaletteFilters().map(v => ({
  label: t(`colors.${v.id}`),
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
