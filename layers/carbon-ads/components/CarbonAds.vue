<template>
  <div
    ref="container"
    class="carbon"
  />
</template>

<script setup lang="ts">
const isInitialized = ref(false);
const container = ref<HTMLElement>();

function init(): void {
  if (!isInitialized.value) {
    isInitialized.value = true;
    const s = document.createElement('script');
    s.id = '_carbonads_js';
    s.src = useRuntimeConfig().public.carbonAdsScriptUrl;
    s.async = true;
    if (container.value !== undefined) {
      container.value.appendChild(s);
    }
  }
}

watch(useRoute(), () => {
  if (isInitialized.value) {
    window?._carbonads?.refresh();
  }
});

onMounted(() => {
  init();
});
</script>

<style>
@media (max-width: 768px) {
  .carbon .carbon-responsive-wrap {
    display: flex;
    flex-wrap: nowrap !important;
    gap: 4px;
    max-width: 80%;
    margin-left: auto !important;
  }
}
</style>
