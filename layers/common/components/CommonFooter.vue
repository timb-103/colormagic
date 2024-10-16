<template>
  <footer class="border-t mt-8">
    <div class="max-w-3xl mx-auto px-4 py-8">
      <div class="mb-8 grid grid-cols-2 sm:grid-cols-3">
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

        <div>
          <p class="text-sm font-semibold mb-2">
            News
          </p>
          <ul class="flex flex-col gap-1">
            <li>
              <UButton
                size="2xs"
                @click="openModal()"
              >
                {{ $t('nav.free') }}
              </UButton>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex items-center gap-4 text-center">
        <!-- copyright label -->
        <p class="text-sm text-gray-400">
          © 2024 ColorMagic
        </p>

        <!-- languages -->
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
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>

    <!-- free modal -->
    <UModal v-model="isModalOpen">
      <UCard>
        <template #header>
          <p class="font-semibold">
            ColorMagic is now 100% free to use!
          </p>
        </template>
        <p class="mb-4">
          We've just acquired this tool from the previous owners and have decided to make it 100% free to use.
        </p>
        <p class="mb-4">
          If you were a previous subscriber, we've canceled your subscription so there will be no more payments. If you
          require a prorated refund please reach out to us on <a
            class="text-primary underline"
            href="mailto:hello@colormagic.app"
          >hello@colormagic.app</a>.
        </p>
        <p>
          We're going to be making some improvements over the coming future, as well as adding other
          cool free tools for you to use. If you have any suggestions, we'd love to hear them!
        </p>
        <template #footer>
          <div class="flex justify-end">
            <UButton
              label="Close"
              @click="closeModal()"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </footer>
</template>

<script setup lang="ts">
const { locales, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const {
  isOpen: isModalOpen,
  open: openModal,
  close: closeModal
} = useModalV2();
</script>
