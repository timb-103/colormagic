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

    <!-- login prompt -->
    <p
      v-if="!user"
      class="text-xl font-bold mb-4"
    >
      <NuxtLinkLocale
        to="/login"
        class="text-primary underline"
      >
        {{ $t('nav.login') }}
      </NuxtLinkLocale>
    </p>

    <!-- loading skeletons -->
    <div v-else-if="!palettes">
      <ul class="grid sm:grid-cols-3 gap-4">
        <li
          v-for="index in 6"
          :key="index"
        >
          <USkeleton class="w-full h-24" />
        </li>
      </ul>
    </div>

    <!-- palettes -->
    <div
      v-else
      class="text-lg font-bold mb-4"
    >
      <ul class="grid sm:grid-cols-3 gap-4">
        <li
          v-for="(item, index) in palettes"
          :key="index"
        >
          <ColorPaletteButton
            :palette-id="item.id"
            :is-liked="true"
            :likes-count="item.likesCount"
            :colors="item.colors"
            :name="item.text"
            :to="localePath(`/palette/${item.id}`)"
          />
        </li>
      </ul>

      <!-- load more button -->
      <div class="mt-8 text-center">
        <UButton
          v-if="palettes.length"
          :label="hasNextPage ? 'Load more...' : 'No more results'"
          :disabled="!hasNextPage"
          :loading="isFetching"
          @click="fetchNextPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const title = t('liked.seoTitle');
const description = t('liked.seoDescription');

const { data: user } = useUser();
const { data: likes, isFetching, hasNextPage, fetchNextPage } = useListPalettesByLiked();

const palettes = computed(() => likes.value?.pages.flat() ?? []);

useSeoMeta({
  title,
  description
});
</script>
