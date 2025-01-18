<template>
  <div class="flex w-full items-start justify-center gap-10">
    <div class="flex w-full max-w-xs flex-col">
      <span>Label</span>

      <div
        class="flex w-full items-center justify-center rounded-md border border-zinc-300 bg-zinc-400 px-4 py-1.5 font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
      >
        Value

        <PhCaretDown class="ml-auto" />
      </div>

      <AnatomyPart
        text="Listbox"
        position="bottom"
        :distance="20"
        class="w-full"
      >
        <div
          class="mt-1 flex w-full flex-col gap-1 rounded-md border border-zinc-300 bg-zinc-400 px-4 py-2 dark:border-zinc-600 dark:bg-zinc-900"
        >
          <div>Option 1</div>
          <AnatomyPart text="Option item" position="right" :distance="20">
            <div>Option 2</div>
          </AnatomyPart>
          <div>Option 3</div>
        </div>
      </AnatomyPart>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnatomyPart from './AnatomyPart.vue';
import PhCaretDown from '~icons/ph/caret-down';
</script>
