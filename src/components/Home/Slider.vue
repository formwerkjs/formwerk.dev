<script setup lang="ts">
import { useSlider, type SliderProps } from '@formwerk/core';
import Thumb from './Thumb.vue';

const props = defineProps<SliderProps>();

const {
  trackProps,
  groupProps,
  labelProps,
  errorMessage,
  errorMessageProps,
  useThumbMetadata,
} = useSlider(props);

const t1 = useThumbMetadata(0);
const t2 = useThumbMetadata(1);
</script>

<template>
  <div class="slider" v-bind="groupProps">
    <div
      v-bind="labelProps"
      class="mb-1 block w-full text-sm font-semibold text-white"
    >
      {{ label }}
    </div>

    <div
      v-bind="trackProps"
      class="track mt-5 mb-6 flex h-1.5 items-center rounded-md bg-stone-500"
    >
      <Thumb />
      <Thumb />
    </div>

    <div v-if="errorMessage" v-bind="errorMessageProps">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
@reference '@inject-css';

.slider {
  --track-width: 200px;

  .track {
    width: var(--track-width);

    &::before {
      @apply h-1.5 rounded-md bg-emerald-500 content-[''];
      translate: calc(v-bind('t1.sliderPercent') * var(--track-width)) 0;
      width: calc(
        (v-bind('t2.sliderPercent') - v-bind('t1.sliderPercent')) * 100%
      );
    }
  }
}
</style>
