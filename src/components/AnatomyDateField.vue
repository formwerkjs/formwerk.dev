<template>
  <div class="flex w-full max-w-xs flex-col items-start">
    <AnatomyPart text="Label" position="left">
      <span>Label</span>
    </AnatomyPart>

    <AnatomyPart text="Control Group" position="top" class="w-full">
      <div
        class="flex w-full items-stretch gap-1 rounded-md border border-zinc-300 bg-zinc-400 px-4 py-1.5 font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
      >
        <AnatomyPart
          text="Date segment"
          position="left"
          class="rounded bg-zinc-500 p-0.5 text-zinc-900"
        >
          09
        </AnatomyPart>
        <div class="rounded p-0.5">/</div>
        <div class="rounded p-0.5">16</div>
        <div class="rounded p-0.5">/</div>
        <div class="rounded p-0.5">2025</div>
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
