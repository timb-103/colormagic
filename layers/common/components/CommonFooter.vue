<template>
  <footer class="border-t mt-8">
    <div class="max-w-3xl mx-auto flex items-center justify-between p-4 text-center">
      <p class="text-sm text-gray-400">
        © 2024 ColorMagic
      </p>

      <div class="text-gray-400 text-sm flex gap-4 items-center">
        <NuxtLink
          to="mailto:hello@colormagic.app"
          class="hover:text-primary"
        >
          Contact
        </NuxtLink>
        <NuxtLink
          to="/terms"
          class="hover:text-primary"
        >
          Terms
        </NuxtLink>
        <NuxtLink
          to="/privacy"
          class="hover:text-primary"
        >
          Privacy
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>
