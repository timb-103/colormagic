<template>
  <nav class="border-b border-gray-200">
    <div class="max-w-3xl mx-auto flex items-center justify-between h-16 px-4">
      <div class="flex gap-4 items-center">
        <NuxtLink to="/">
          <img
            width="128px"
            height="20.4px"
            src="/img/HorizontalLogo.svg"
          >
        </NuxtLink>

        <NuxtLink
          to="/"
          active-class="text-primary"
          class="text-gray-400 font-medium text-sm hover:text-primary"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/recent"
          active-class="text-primary"
          class="text-gray-400 font-medium text-sm hover:text-primary"
        >
          Recent
        </NuxtLink>
      </div>

      <div class="flex gap-2 items-center">
        <UButton
          v-if="useRoute().path !== '/'"
          label="New"
          icon="i-heroicons-plus"
          to="/"
          color="primary"
          trailing
        />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>
