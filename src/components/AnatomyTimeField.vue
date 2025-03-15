<template>
  <div class="flex w-full max-w-xs flex-col items-center">
    <AnatomyPart text="Control Group" position="right" class="w-max">
      <AnatomyPart text="Label" position="left">
        <span>Label</span>
      </AnatomyPart>
      <div
        class="flex w-full items-stretch gap-1 rounded-md border border-zinc-300 bg-zinc-400 px-4 py-1.5 font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
      >
        <AnatomyPart
          text="Date segment"
          position="left"
          class="rounded bg-zinc-500 p-0.5 text-zinc-900"
        >
          10
        </AnatomyPart>
        <div class="rounded p-0.5">:</div>
        <div class="rounded p-0.5">04</div>
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
