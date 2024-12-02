<template>
  <nav class="border-b border-gray-200">
    <div class="max-w-3xl mx-auto flex items-center justify-between h-16 px-4">
      <div class="flex items-center">
        <!-- logo -->
        <NuxtLinkLocale
          external
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

        <div class="hidden sm:flex ml-4 items-center">
          <!-- links -->
          <ul class="flex items-center">
            <li
              v-for="(item, index) in links"
              :key="index"
            >
              <UButton
                external
                :to="item.to"
                :label="item.label"
                active-class="text-primary"
                variant="soft"
                class="hover:text-primary font-semibold"
                size="md"
              />
            </li>
          </ul>

          <!-- popover -->
          <UPopover
            v-model:open="isOpen"
            mode="hover"
          >
            <UButton
              variant="soft"
              class="hover:text-primary font-semibold"
              size="md"
              icon="i-heroicons-chevron-down-16-solid"
              trailing
            >
              {{ $t('nav.tools') }}
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
          </UPopover>
        </div>
      </div>

      <!-- right -->
      <div class="flex items-center gap-2 sm:gap-4">
        <UButton
          icon="i-fa6-brands-github"
          variant="ghost"
          color="gray"
          to="https://github.com/timb-103/colormagic"
          class="hidden sm:flex"
        />

        <!-- lang switcher-->
        <CommonLangSwitcher />

        <!-- login button -->
        <ClientOnly>
          <UButton
            v-if="!user && !useRoute().path.includes('/login')"
            label="Login"
            color="primary"
            to="/login"
          />

          <!-- profile menu -->
          <UDropdown
            v-else-if="user"
            :items="userItems"
            :popper="{ placement: 'bottom-end' }"
          >
            <UButton icon="i-heroicons-user" />
          </UDropdown>
        </ClientOnly>

        <!-- mobile bars button -->
        <UButton
          icon="i-heroicons-bars-3"
          class="sm:hidden"
          aria-label="nav"
          @click="openModal()"
        />
      </div>
    </div>

    <!-- mobile menu modal -->
    <UModal
      v-model="isModalOpen"
      fullscreen
    >
      <div class="p-4 overflow-auto">
        <div class="flex items-center justify-between mb-4">
          <!-- logo -->
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

          <!-- close button -->
          <UButton
            icon="i-heroicons-x-mark"
            @click="isModalOpen = false"
          />
        </div>

        <!-- links -->
        <UVerticalNavigation :links="[[...links],[...toolsLinks]]" />
      </div>
    </UModal>
  </nav>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const { data: user } = useUser();

const isOpen = ref(false);

const {
  isOpen: isModalOpen,
  open: openModal,
  close: closeModal
} = useModalV2();

const links = computed(() => [
  {
    label: t('nav.explore'),
    to: localePath('/palette/explore')
  },
  {
    label: t('nav.liked'),
    to: localePath('/palette/liked')
  }
]);

const toolsLinks = computed(() => [{
  to: localePath('/'),
  label: t('nav.colorPaletteGenrator'),
  description: t('home.title'),
  icon: 'i-heroicons-paint-brush'
},
{
  to: localePath('/random-color'),
  label: t('nav.randomColor'),
  description: t('randomColor.seoDescription'),
  icon: 'i-heroicons-arrow-path'
},
{
  to: localePath('/image-color-picker'),
  label: t('nav.imageColorPicker'),
  description: t('imageColorPicker.seoDescription'),
  icon: 'i-heroicons-photo'
},
{
  to: localePath('/contrast-checker'),
  label: t('nav.contrastChecker'),
  description: t('contrastChecker.seoDescription'),
  icon: 'i-heroicons-sun'
}]);

const userItems = computed(() => [
  [{
    label: user.value?.email ?? 'Unknown email',
    disabled: true
  }], [{
    label: t('nav.liked'),
    to: '/palette/liked',
    icon: 'i-heroicons-heart'
  }], [{
    label: 'Logout',
    click: () => {
      useAuthLogout();
    }
  }]
]);

watch(useRoute(), () => {
  isOpen.value = false;
  closeModal();
});
</script>
