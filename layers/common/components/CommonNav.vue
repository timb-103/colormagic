<template>
  <nav class="border-b border-gray-200">
    <div class="max-w-3xl mx-auto flex items-center justify-between h-16 px-4">
      <NuxtLink to="/">
        <img
          width="128px"
          height="20.4px"
          src="/img/HorizontalLogo.svg"
        >
      </NuxtLink>

      <UButton
        v-if="useRoute().path !== '/'"
        label="New"
        icon="i-heroicons-plus"
        to="/"
        color="primary"
        trailing
      />
    </div>
  </nav>
</template>

<script setup lang="ts"></script>
