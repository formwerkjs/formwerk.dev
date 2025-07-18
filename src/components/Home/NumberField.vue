<script setup lang="ts">
import { type NumberFieldProps, useNumberField } from '@formwerk/core';

const props = defineProps<NumberFieldProps>();

const {
  inputProps,
  labelProps,
  errorMessage,
  errorMessageProps,
  incrementButtonProps,
  decrementButtonProps,
} = useNumberField(props);
</script>

<template>
  <div class="InputNumber">
    <label v-bind="labelProps">{{ label }}</label>

    <div class="wrapper flex items-stretch">
      <input v-bind="inputProps" />

      <div class="flex flex-col border-l border-zinc-700">
        <button type="button" v-bind="incrementButtonProps">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 fill-current text-zinc-300"
            viewBox="0 0 256 256"
          >
            <path
              d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"
            ></path>
          </svg>
        </button>
        <button type="button" v-bind="decrementButtonProps">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 fill-current text-zinc-300"
            viewBox="0 0 256 256"
          >
            <path
              d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <span v-bind="errorMessageProps" class="error-message">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style scoped>
@reference '@inject-css';

.InputNumber {
  @apply relative w-full max-w-xs;
  margin-bottom: calc(1em * 1.5);

  label {
    @apply mb-1 block w-full text-lg font-semibold text-white;
  }

  input {
    @apply w-full bg-zinc-800 px-4 py-3 text-xl font-medium text-white transition-colors duration-200 focus:border-emerald-500 focus:bg-zinc-900 focus:outline-none disabled:cursor-not-allowed;
  }

  .wrapper {
    @apply flex items-stretch overflow-hidden rounded-md border border-zinc-700 bg-zinc-800;

    &:has(input:focus) {
      @apply ring-2 ring-emerald-500;
    }
  }

  .error-message {
    @apply absolute left-0 text-sm text-red-500;
    bottom: calc(-1.5 * 1em);
  }

  &.has-error {
    input {
      @apply bg-red-100 text-red-600 focus:border-red-500;
    }
  }

  button {
    @apply h-full bg-zinc-800 p-2 transition-all duration-200 hover:bg-zinc-900;

    &:disabled {
      @apply cursor-not-allowed opacity-50 hover:bg-transparent;
    }
  }

  button + button {
    @apply border-t border-zinc-700;
  }
}
</style>
