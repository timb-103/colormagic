<template>
  <div>system is healthy</div>
</template>

<script setup lang="ts">
useSeoMeta({
  robots: {
    noindex: true,
    nofollow: true
  }
});

const { data } = await useFetch('/api/health');

if (data.value?.ok !== 1) {
  throw createError({
    statusCode: 503,
    statusMessage: 'service unhealthy, try again in a few seconds'
  });
}
</script>
