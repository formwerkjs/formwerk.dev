<template>
  <div class="flex w-full max-w-sm flex-col items-center">
    <div class="absolute right-2 top-3 flex flex-col items-end gap-1 text-xs">
      <label for="view-select">Type</label>
      <select id="view-select" class="rounded-md py-1 text-sm" v-model="view">
        <option value="file">File</option>
        <option value="dropzone">Dropzone</option>
      </select>
    </div>

    <div v-if="view === 'file'">
      <AnatomyPart text="Trigger" position="top" class="w-max" :distance="24">
        <div
          class="flex w-full items-center rounded-md bg-zinc-400 px-4 py-1.5 text-sm font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
        >
          <PhPaperclip class="mr-1 h-4 w-4" />

          Choose a file
        </div>
      </AnatomyPart>

      <AnatomyPart
        text="File Entry"
        position="left"
        class="mt-1 flex items-center gap-1"
      >
        <PhFile class="h-4 w-4" />

        <span class="text-sm">File.pdf</span>

        <AnatomyPart text="Remove button" position="right">
          <PhX class="h-3.5 w-3.5 text-zinc-300" />
        </AnatomyPart>
      </AnatomyPart>

      <AnatomyPart
        text="Description or Error Message"
        position="right"
        class="mt-1 w-max"
        :distance="14"
      >
        <span class="text-sm">Help text</span>
      </AnatomyPart>
    </div>

    <template v-if="view === 'dropzone'">
      <AnatomyPart
        text="Dropzone"
        position="left"
        class="flex w-full flex-col items-center rounded-md border border-dashed border-zinc-500 p-4"
      >
        <AnatomyPart text="Trigger (optional)" position="top" class="w-max">
          <div
            class="flex w-full items-center rounded-md bg-zinc-400 px-4 py-1.5 text-sm font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
          >
            <PhPaperclip class="mr-1 h-4 w-4" />

            Choose a file
          </div>
        </AnatomyPart>

        <div class="mt-4 flex flex-wrap items-center gap-1.5">
          <div
            class="flex size-16 flex-col items-center justify-center gap-1 rounded-md border border-zinc-900 bg-zinc-900 p-2"
          >
            <PhFile class="h-4 w-4" />

            <span class="text-sm">File.pdf</span>
          </div>
          <div
            class="flex size-16 flex-col items-center justify-center gap-1 rounded-md border border-zinc-900 bg-zinc-900 p-2"
          >
            <PhFile class="h-4 w-4" />

            <span class="text-sm">File.pdf</span>
          </div>

          <AnatomyPart
            text="File Entry"
            position="bottom"
            class="relative flex size-16 flex-col items-center justify-center gap-1 rounded-md border border-zinc-400 bg-zinc-900 p-2"
          >
            <PhFile class="h-4 w-4" />
            <div class="absolute -right-2 -top-2">
              <AnatomyPart
                text="Remove button"
                position="right"
                class="flex size-5 items-center justify-center rounded-full bg-red-900"
              >
                <PhX class="h-3.5 w-3.5" />
              </AnatomyPart>
            </div>

            <span class="text-sm">File.pdf</span>
          </AnatomyPart>
        </div>
      </AnatomyPart>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PhPaperclip from '~icons/ph/paperclip';
import PhFile from '~icons/ph/file';
import PhX from '~icons/ph/x-bold';
import AnatomyPart from './AnatomyPart.vue';

const view = ref('file');
</script>
