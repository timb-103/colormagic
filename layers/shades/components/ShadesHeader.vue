<template>
  <div>
    <!-- header-->
    <div class="mb-8 flex flex-col sm:flex-row gap-8">
      <div>
        <!-- title -->
        <h1 class="capitalize">
          {{ title }}
        </h1>

        <!-- description-->
        <p class="text-xl font-medium mb-4 max-w-xl">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  title: string
  description: string
  tags: string[]
  tagsTranslated: string[]
}

defineProps<Props>();
</script>
