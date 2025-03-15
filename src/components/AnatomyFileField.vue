<template>
  <div class="flex w-full max-w-xs flex-col items-start">
    <AnatomyPart text="Label" position="left">
      <span>Label</span>
    </AnatomyPart>

    <AnatomyPart text="Input" position="center" class="w-full">
      <div
        class="w-full rounded-md border border-zinc-300 bg-zinc-400 px-4 py-1.5 font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
      >
        Value
      </div>
    </AnatomyPart>

    <AnatomyPart text="Description or Error Message" position="right">
      <span class="mt-1 text-sm">Help text</span>
    </AnatomyPart>
  </div>
</template>

<script setup lang="ts">
import AnatomyPart from './AnatomyPart.vue';
</script>
