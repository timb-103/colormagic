<template>
  <div>
    <!-- brightness -->
    <div>
      <p class="font-semibold text-sm">
        {{ $t('palette.brightness') }}
      </p>
      <URange
        v-model="model.brightness"
        :min="-100"
        :max="100"
      />
    </div>

    <!-- saturation -->
    <div>
      <p class="font-semibold text-sm">
        {{ $t('palette.saturation') }}
      </p>
      <URange
        v-model="model.saturation"
        :min="-100"
        :max="100"
      />
    </div>

    <!-- warmth -->
    <div>
      <p class="font-semibold text-sm">
        {{ $t('palette.warmth') }}
      </p>
      <URange
        v-model="model.warmth"
        :min="-100"
        :max="100"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<{ brightness: number, saturation: number, warmth: number }>({ required: true });
</script>
