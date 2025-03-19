<template>
  <div class="flex w-full items-start justify-center gap-10">
    <div class="flex w-full max-w-xs flex-col">
      <AnatomyPart text="Label" position="top" class="mr-auto" :distance="20">
        <span>Label</span>
      </AnatomyPart>

      <AnatomyPart text="Trigger" position="top" class="w-full">
        <div
          class="flex w-full items-center justify-center rounded-md border border-zinc-300 bg-zinc-400 px-4 py-1.5 font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
        >
          <AnatomyPart text="Selected value" position="left" class="w-min">
            Value
          </AnatomyPart>

          <PhCaretDown class="ml-auto" />
        </div>
      </AnatomyPart>

      <AnatomyPart
        text="Description or Error Message"
        position="right"
        class="w-min whitespace-nowrap"
      >
        <span class="mt-1 text-sm">Help text</span>
      </AnatomyPart>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnatomyPart from './AnatomyPart.vue';
import PhCaretDown from '~icons/ph/caret-down';
</script>
