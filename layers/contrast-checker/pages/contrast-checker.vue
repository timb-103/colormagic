<template>
  <div>
    <!-- header-->
    <div class="mb-8">
      <!-- title -->
      <h1>
        {{ $t('contrastChecker.title') }}
      </h1>

      <!-- description-->
      <p class="text-xl font-medium mb-4 max-w-xl">
        {{ $t('contrastChecker.seoDescription') }}
      </p>
    </div>

    <!-- color -->
    <div class="overflow-hidden border border-gray-200 rounded-2xl mb-4">
      <!-- the color block -->
      <div
        class="h-44 w-full flex justify-center items-center"
        :style="{ background: arrangedSecondaryColor[0] }"
      >
        <p
          :style="{ color: arrangedPrimaryColor[0] }"
          class="font-semibold text-xl"
        >
          {{ $t('contrastChecker.exampleText') }}
        </p>
      </div>

      <!-- all contrast ratio checks -->
      <ul class="flex flex-wrap gap-4 sm:gap-8 p-4 border-t border-gray-200">
        <li>
          <p class="font-semibold text-sm">
            {{ $t('contrastChecker.contrastRatio') }}:
          </p>
          <UBadge
            color="white"
            :label="contrastRatio.toFixed(2)"
          />
        </li>
        <li>
          <p class="font-semibold text-sm">
            {{ $t('contrastChecker.normalText') }}:
          </p>
          <UBadge
            :color="contrastRatio >= 4.5 ? 'green' : 'red'"
            :label="contrastRatio < 4.5 ? $t('contrastChecker.failText') : contrastRatio < 7 ? 'AA' : 'AAA'"
          />
        </li>
        <li>
          <p class="font-semibold text-sm">
            {{ $t('contrastChecker.largeText') }}:
          </p>
          <UBadge
            :color="contrastRatio >= 3 ? 'green' : 'red'"
            :label="contrastRatio < 3 ? $t('contrastChecker.failText') : contrastRatio < 4.5 ? 'AA' : 'AAA'"
          />
        </li>
        <li>
          <p class="font-semibold text-sm">
            {{ $t('contrastChecker.uiComponents') }}:
          </p>
          <UBadge
            :color="contrastRatio >= 3 ? 'green' : 'red'"
            :label="contrastRatio < 3 ? $t('contrastChecker.failText') : 'AA'"
          />
        </li>
      </ul>
    </div>

    <!-- form -->
    <UForm
      :state="state"
      :schema="FormSchema"
      class="grid sm:grid-cols-2 gap-4 items-start"
    >
      <!-- primary -->
      <div class="border rounded-2xl overflow-hidden">
        <div class="p-4 space-y-4">
          <UFormGroup
            name="primary"
            :label="$t('contrastChecker.primaryLabel')"
          >
            <div class="flex gap-2 items-center">
              <!-- color picker -->
              <ColorPicker
                :initial-color="state.primary"
                @select="value => state.primary = value"
              />

              <!-- input -->
              <UInput
                v-model="state.primary"
                placeholder="#000000"
              />
            </div>
          </UFormGroup>

          <!-- arrange sliders-->
          <ColorArrangeSliders v-model="arrangePrimary" />

          <!-- reset button -->
          <UButton
            v-if="primaryHasChanges"
            :label="$t('palette.resetLabel')"
            block
            @click="resetPrimaryArrange()"
          />
        </div>

        <!-- color block -->
        <div
          v-if="primaryHasChanges"
          class="flex gap-4 items-center border-t bg-white"
        >
          <div
            class="w-20 h-20"
            :style="{ background: arrangedPrimaryColor[0] }"
          />

          <!-- copy buttons-->
          <ColorCopyButtons :hex="arrangedPrimaryColor[0]" />
        </div>
      </div>

      <!-- secondary -->
      <div class="border rounded-2xl overflow-hidden">
        <div class="p-4 space-y-4">
          <UFormGroup
            name="secondary"
            :label="$t('contrastChecker.secondaryLabel')"
          >
            <div class="flex gap-2 items-center">
              <!-- color picker -->
              <ColorPicker
                :initial-color="state.secondary"
                @select="value => state.secondary = value"
              />

              <!-- input -->
              <UInput
                v-model="state.secondary"
                placeholder="#000000"
              />
            </div>
          </UFormGroup>

          <!-- arrange sliders-->
          <ColorArrangeSliders v-model="arrangeSecondary" />

          <!-- reset button -->
          <UButton
            v-if="secondaryHasChanges"
            :label="$t('palette.resetLabel')"
            block
            @click="resetSecondaryArrange()"
          />
        </div>

        <!-- color block -->
        <div
          v-if="secondaryHasChanges"
          class="flex gap-4 items-center border-t bg-white"
        >
          <div
            class="w-20 h-20"
            :style="{ background: arrangedSecondaryColor[0] }"
          />

          <!-- copy buttons-->
          <ColorCopyButtons :hex="arrangedSecondaryColor[0]" />
        </div>
      </div>
    </UForm>

    <!-- description + links -->
    <div class="my-8 text-sm">
      <p class="mb-4">
        {{ $t('contrastChecker.legibilityDescription') }}
      </p>
      <ul class="list-inside list-decimal pl-4 flex flex-col gap-2">
        <li>
          <UButton
            variant="link"
            :padded="false"
            to="https://www.w3.org/TR/WCAG21/#contrast-minimum"
            label="1.4.3 Minimum Contrast (AA)"
          />
        </li>
        <li>
          <UButton
            variant="link"
            :padded="false"
            to="https://www.w3.org/TR/WCAG21/#contrast-enhanced"
            label="1.4.6 Enhanced Contrast (AAA)"
          />
        </li>
        <li>
          <UButton
            variant="link"
            :padded="false"
            to="https://www.w3.org/TR/WCAG21/#non-text-contrast"
            label="1.4.11 Non-Text Contrast (AA)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, type InferType, string } from 'yup';
import ntc from '~/layers/palette/utils/ntc.util';

const { t } = useI18n();

const title = t('contrastChecker.seoTitle');
const description = t('contrastChecker.seoDescription');

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImageUrl: `${useRuntimeConfig().public.siteUrl}/img/og.png`
});

const state = ref({
  primary: '#fae8c7',
  secondary: '#9a6acd'
});

const FormSchema = object({
  primary: string().required(),
  secondary: string().required()
});

export type Form = InferType<typeof FormSchema>;

const arrangePrimary = ref({
  brightness: 0,
  saturation: 0,
  warmth: 0
});

const arrangeSecondary = ref({
  brightness: 0,
  saturation: 0,
  warmth: 0
});

const arrangedPrimaryColor = computed(() => arrangeColors([state.value.primary], {
  brightness: arrangePrimary.value.brightness,
  saturation: arrangePrimary.value.saturation,
  warmth: arrangePrimary.value.warmth
}));

const arrangedSecondaryColor = computed(() => arrangeColors([state.value.secondary], {
  brightness: arrangeSecondary.value.brightness,
  saturation: arrangeSecondary.value.saturation,
  warmth: arrangeSecondary.value.warmth
}));

const contrastRatio = computed(() => {
  return calculateContrastRatio(
    ntc.rgb(arrangedPrimaryColor.value[0]),
    ntc.rgb(arrangedSecondaryColor.value[0])
  );
});

const primaryHasChanges = computed(() => {
  return arrangePrimary.value.brightness !== 0 ||
  arrangePrimary.value.saturation !== 0 ||
  arrangePrimary.value.warmth !== 0;
});

const secondaryHasChanges = computed(() => {
  return arrangeSecondary.value.brightness !== 0 ||
  arrangeSecondary.value.saturation !== 0 ||
  arrangeSecondary.value.warmth !== 0;
});

function resetPrimaryArrange(): void {
  arrangePrimary.value.brightness = 0;
  arrangePrimary.value.saturation = 0;
  arrangePrimary.value.warmth = 0;
}

function resetSecondaryArrange(): void {
  arrangeSecondary.value.brightness = 0;
  arrangeSecondary.value.saturation = 0;
  arrangeSecondary.value.warmth = 0;
}
</script>
