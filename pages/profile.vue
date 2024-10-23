<template>
  <div>
    {{ user }}
  </div>
</template>

<script setup lang="ts">
const { data: user } = useUser();
</script>
