<template>
  <nav class="border-b border-gray-200">
    <div class="max-w-3xl mx-auto flex items-center justify-between h-16 px-4">
      <div class="flex gap-4 items-center">
        <NuxtLinkLocale
          to="/"
          aria-label="Home"
        >
          <img
            width="128px"
            height="20.4px"
            src="/img/HorizontalLogo.svg"
            alt="ColorMagic - AI Color Palette generator"
          >
        </NuxtLinkLocale>

        <NuxtLinkLocale
          to="/"
          active-class="text-primary"
          class="hidden sm:block font-semibold text-sm hover:text-primary"
        >
          {{ $t('nav.home') }}
        </NuxtLinkLocale>

        <NuxtLinkLocale
          to="/recent"
          active-class="text-primary"
          class="font-semibold text-sm hover:text-primary"
        >
          {{ $t('nav.recent') }}
        </NuxtLinkLocale>

        <!-- popovers -->
        <!-- <UPopover
          v-model:open="isOpen"
          mode="hover"
        >
          <UButton
            variant="soft"
            class="hover:text-primary font-semibold"
            icon="i-heroicons-chevron-down-16-solid"
            trailing
            :padded="false"
          >
            Tools
          </UButton>

          <template #panel>
            <div class="p-2">
              <UHeaderPopoverLinks
                :links="toolsLinks"
                :ui="{
                  base: 'text-left',
                  wrapper: 'grid gap-2 max-w-xs space-y-0 items-start justify-start text-left',
                  icon: {
                    base: 'text-primary w-4 h-4 mt-2'
                  },
                }"
              />
            </div>
          </template>
        </UPopover> -->
      </div>

      <div class="flex gap-2.5 items-center">
        <NuxtLink
          v-for="item in locales"
          :key="item.code"
          :to="switchLocalePath(item.code)"
          class="font-medium text-sm hover:text-primary"
          :class="{
            'text-black': locale === item.code,
            'text-gray-400': locale !== item.code
          }"
        >
          {{ item.code }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { locales, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
// const localePath = useLocalePath();

// const isOpen = ref(false);

// const toolsLinks = [{
//   to: localePath('/'),
//   label: t('nav.colorPaletteGenrator'),
//   description: t('home.title'),
//   icon: 'i-heroicons-paint-brush'
// },
// {
//   to: localePath('/random-color'),
//   label: t('nav.randomColor'),
//   description: t('randomColor.seoDescription'),
//   icon: 'i-heroicons-arrow-path'
// }];

// watch(useRoute(), () => {
//   isOpen.value = false;
// });
</script>
