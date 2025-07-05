<script setup lang="ts">
import AnatomyPart from './AnatomyPart.vue';
import PhCaretLeft from '~icons/ph/caret-left';
import PhCaretRight from '~icons/ph/caret-right';
</script>

<template>
  <div class="flex w-full flex-col items-center gap-4 pb-7">
    <AnatomyPart
      text="Form"
      position="left"
      class="flex w-full max-w-xl flex-col items-center gap-2 rounded-md border border-dashed border-zinc-500 p-4"
    >
      <AnatomyPart
        text="<FormStep />"
        position="right"
        class="flex w-full max-w-sm flex-col items-center gap-2 rounded-md border border-dashed border-zinc-500 p-3"
      >
        <div class="text-lg font-medium">Step 1</div>

        <div class="flex w-full max-w-xs flex-col items-start">
          <span>Field 1</span>
          <div
            class="w-full rounded-md border border-zinc-300 bg-zinc-400 px-4 py-1.5 font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
          >
            Value
          </div>
        </div>
        <div class="flex w-full max-w-xs flex-col items-start">
          <span>Field 2</span>

          <div
            class="w-full rounded-md border border-zinc-300 bg-zinc-400 px-4 py-1.5 font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
          >
            Value
          </div>
        </div>
      </AnatomyPart>

      <div class="flex w-full max-w-xs items-center justify-between gap-8">
        <AnatomyPart
          text="Previous Step Button"
          position="bottom"
          class="flex items-center gap-2 rounded-md bg-zinc-900 px-2 py-1 text-sm"
        >
          <PhCaretLeft />
          Previous
        </AnatomyPart>

        <AnatomyPart
          text="Next Step Button"
          position="bottom"
          class="flex items-center gap-2 rounded-md bg-zinc-900 px-2 py-1 text-sm"
        >
          Next
          <PhCaretRight />
        </AnatomyPart>
      </div>
    </AnatomyPart>
  </div>
</template>
