<template>
  <div v-bind="optionProps" class="option rounded border px-2 py-2 text-sm">
    <slot>
      {{ label }}
    </slot>
  </div>
</template>

<script setup lang="ts">
import { type OptionProps, useOption } from '@formwerk/core';

const props = defineProps<OptionProps<any>>();

const { optionProps } = useOption(props);
</script>

<style scoped>
@reference '@inject-css';

.option {
  @apply cursor-pointer border border-transparent font-normal text-white select-none;

  &:focus {
    @apply border-emerald-500 outline-none;
  }

  &[aria-selected='true'],
  &[aria-checked='true'] {
    @apply bg-emerald-600 text-white;
  }
}
</style>
