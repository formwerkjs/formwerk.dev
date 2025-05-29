<script setup lang="ts">
import { type TextFieldProps, useTextField } from '@formwerk/core';

const props = defineProps<TextFieldProps>();

const { inputProps, labelProps, errorMessage, errorMessageProps } =
  useTextField(props);
</script>

<template>
  <div class="TextField">
    <label v-bind="labelProps">{{ label }}</label>
    <input v-bind="inputProps" />

    <div v-bind="errorMessageProps" class="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.TextField {
  position: relative;
  width: 100%;
  max-width: 20rem;
  margin-bottom: calc(1em * 1.5);

  label {
    display: block;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
  }

  input {
    width: 100%;
    cursor: pointer;
    white-space: nowrap;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    border: 1px solid rgb(63, 63, 70);
    background-color: rgb(39, 39, 42);
    padding: 0.75rem 0.75rem 0.75rem 1rem;
    color: white;
    transition-property: all;
    transition-duration: 200ms;

    &:focus {
      border-color: rgb(16, 185, 129);
      outline: none;
      box-shadow: 0 0 0 1px rgb(16, 185, 129);
      background-color: rgb(24, 24, 27);
    }

    &:hover {
      background-color: rgb(24, 24, 27);
    }

    &:user-invalid {
      border-color: rgb(239, 68, 68);
      outline: none;
      box-shadow: 0 0 0 1px rgb(239, 68, 68);
      background-color: rgb(39, 39, 42);
    }

    &::placeholder {
      color: rgb(161, 161, 170);
    }
  }

  .error {
    position: absolute;
    left: 0;
    top: 100%;
    margin-top: 0.25rem;
    display: none;
    font-size: 0.75rem;
    line-height: 1.2;
    color: rgb(239, 68, 68);
    width: 100%;
    word-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
    max-height: 3rem;
    overflow-y: auto;
    padding: 0.25rem 0;
    scrollbar-width: thin;
    scrollbar-color: rgb(239, 68, 68) transparent;
    overflow-y: overlay;
  }

  &:has(:user-invalid) {
    .error {
      display: block;
    }
    margin-bottom: calc(1em * 1.5 + 3rem);
  }
}
</style>
