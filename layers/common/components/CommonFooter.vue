<template>
  <footer class="border-t mt-8">
    <div class="max-w-3xl mx-auto px-4 py-8">
      <div class="mb-8 grid grid-cols-2">
        <div>
          <p class="text-sm font-semibold mb-2">
            Free Color Tools
          </p>
          <ul class="flex flex-col gap-1">
            <li>
              <NuxtLinkLocale
                to="/"
                class="hover:text-primary text-sm font-medium text-gray-400"
                active-class="text-primary"
              >
                {{ $t('nav.colorPaletteGenrator') }}
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale
                to="/random-color"
                class="hover:text-primary text-sm font-medium text-gray-400"
                active-class="text-primary"
              >
                {{ $t('nav.randomColor') }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-sm font-semibold mb-2">
            More
          </p>
          <ul class="flex flex-col gap-1">
            <li>
              <NuxtLinkLocale
                to="https://colormagic.canny.io/"
                class="hover:text-primary text-sm font-medium text-gray-400"
                active-class="text-primary"
              >
                {{ $t('nav.suggestIdea') }}
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLink
                to="mailto:hello@colormagic.app"
                class="hover:text-primary text-sm font-medium text-gray-400"
                active-class="text-primary"
              >
                {{ $t('nav.contact') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLinkLocale
                to="/terms"
                class="hover:text-primary text-sm font-medium text-gray-400"
                active-class="text-primary"
              >
                {{ $t('nav.terms') }}
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale
                to="/privacy"
                class="hover:text-primary text-sm font-medium text-gray-400"
                active-class="text-primary"
              >
                {{ $t('nav.privacy') }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex items-center justify-between text-center">
        <!-- copyright label -->
        <p class="text-sm text-gray-400">
          © 2024 ColorMagic
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>
