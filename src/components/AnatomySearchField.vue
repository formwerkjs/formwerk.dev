<template>
  <div class="flex w-full max-w-xs flex-col items-start">
    <AnatomyPart text="Label" position="left">
      <span>Label</span>
    </AnatomyPart>

    <AnatomyPart text="Input" position="center" class="w-full">
      <div
        class="flex w-full items-center gap-2 rounded-md border border-zinc-300 bg-zinc-400 px-4 py-1.5 font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
      >
        <PhMagnifyingGlass />

        Value

        <AnatomyPart
          text="Clear button"
          class="ml-auto flex items-center"
          position="right"
        >
          <PhX />
        </AnatomyPart>
      </div>
    </AnatomyPart>

    <AnatomyPart text="Description or Error Message" position="right">
      <span class="mt-1 text-sm">Help text</span>
    </AnatomyPart>
  </div>
</template>

<script setup lang="ts">
import AnatomyPart from './AnatomyPart.vue';
import PhMagnifyingGlass from '~icons/ph/magnifying-glass';
import PhX from '~icons/ph/x';
</script>
