<template>
  <div>
    <USkeleton class="w-full h-24" />
  </div>
</template>

<script setup lang="ts">
const { query } = useRoute();
await navigateTo({ path: '/login', query });
</script>
