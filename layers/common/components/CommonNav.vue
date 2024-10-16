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
          class="text-gray-400 font-medium text-sm hover:text-primary"
        >
          {{ $t('nav.home') }}
        </NuxtLinkLocale>

        <NuxtLinkLocale
          to="/recent"
          active-class="text-primary"
          class="text-gray-400 font-medium text-sm hover:text-primary"
        >
          {{ $t('nav.recent') }}
        </NuxtLinkLocale>
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
</script>
