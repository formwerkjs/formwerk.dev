<template>
  <div class="flex w-full max-w-xs flex-col items-center gap-2">
    <AnatomyPart text="Label" position="left">
      <span>Label</span>
    </AnatomyPart>

    <AnatomyPart text="Control" position="right" class="">
      <div
        class="flex size-24 items-center justify-center rounded-md border-2 border-dashed border-zinc-300 px-4 py-1.5 text-xl font-bold font-medium text-zinc-700 dark:border-zinc-600 dark:text-zinc-400"
      >
        ???
      </div>
    </AnatomyPart>

    <AnatomyPart text="Description or Error Message" position="left">
      <span class="mt-1 text-sm">Help text</span>
    </AnatomyPart>
  </div>
</template>

<script setup lang="ts">
import AnatomyPart from './AnatomyPart.vue';
</script>
