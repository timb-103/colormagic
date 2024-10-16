<template>
  <footer class="border-t mt-8">
    <div class="max-w-3xl mx-auto flex items-center justify-between p-4 text-center">
      <!-- copyright label -->
      <p class="text-sm text-gray-400">
        © 2024 ColorMagic
      </p>

      <!-- links -->
      <div class="text-gray-400 text-sm flex gap-4 items-center">
        <NuxtLink
          to="mailto:hello@colormagic.app"
          class="hover:text-primary"
        >
          {{ $t('footer.contact') }}
        </NuxtLink>
        <NuxtLinkLocale
          to="/terms"
          class="hover:text-primary"
        >
          {{ $t('footer.terms') }}
        </NuxtLinkLocale>
        <NuxtLinkLocale
          to="/privacy"
          class="hover:text-primary"
        >
          {{ $t('footer.privacy') }}
        </NuxtLinkLocale>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>
