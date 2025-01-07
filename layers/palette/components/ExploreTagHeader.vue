<template>
  <div>
    <!-- ads -->
    <div class="mb-4">
      <CarbonAds />
    </div>

    <!-- header-->
    <div class="mb-8 flex flex-col gap-8">
      <div class="">
        <!-- title -->
        <h1 class="capitalize">
          {{ title }}
        </h1>

        <!-- description-->
        <p class="text-xl font-medium mb-4 max-w-xl">
          {{ description }}
        </p>

        <!-- count of palettes generated -->
        <!-- <p class="italic text-xs">
          {{ count?.count.toLocaleString() ?? 0 }} color palettes generated
        </p> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  title: string
  description: string
  tags?: string[]
}

defineProps<Props>();

// const { data: count } = usePaletteCount();
</script>
