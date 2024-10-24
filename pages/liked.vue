<template>
  <div>
    <!-- header-->
    <div class="mb-8">
      <!-- title -->
      <h1>
        {{ $t('liked.title') }}
      </h1>

      <!-- description-->
      <p class="text-xl font-medium mb-4 max-w-xl">
        {{ description }}
      </p>
    </div>

    <p
      v-if="!user"
      class="text-lg font-bold mb-4"
    >
      Like palettes to save them to this page. Get started by <NuxtLinkLocale
        to="/login"
        class="text-primary underline"
      >
        logging in.
      </NuxtLinkLocale>
    </p>
    <p
      v-else
      class="text-lg font-bold mb-4"
    >
      {{ $t('liked.comingSoon') }}
    </p>
  </div>
</template>

<script setup lang="ts">

const { t } = useI18n();
const { data: user } = useUser();

const title = t('liked.seoTitle');
const description = t('liked.seoDescription');

useSeoMeta({
  title,
  description
});
</script>
