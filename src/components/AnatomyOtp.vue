<template>
  <div class="flex flex-col gap-1 py-8">
    <AnatomyPart text="Label" position="top" class="mr-auto">
      <span>Enter your code</span>
    </AnatomyPart>

    <AnatomyPart
      text="Control"
      position="right"
      class="flex items-center gap-2 rounded-md border border-dashed border-zinc-500 p-3"
    >
      <span
        class="inline-flex size-10 items-center justify-center rounded-md border border-zinc-600 bg-zinc-900 text-center text-lg font-semibold"
        >1</span
      >
      <span
        class="inline-flex size-10 items-center justify-center rounded-md border border-zinc-600 bg-zinc-900 text-center text-lg font-semibold"
        >2</span
      >
      <span
        class="inline-flex size-10 items-center justify-center rounded-md border border-zinc-600 bg-zinc-900 text-center text-lg font-semibold"
        >3</span
      >

      <span class="separator">-</span>

      <AnatomyPart text="OTP Slot" position="top">
        <span
          class="inline-flex size-10 items-center justify-center rounded-md border border-zinc-400 bg-zinc-900"
        >
          <span class="h-5 animate-pulse border-l"></span>
        </span>
      </AnatomyPart>

      <span
        class="size-10 rounded-md border border-zinc-600 bg-zinc-900"
      ></span>
      <span
        class="size-10 rounded-md border border-zinc-600 bg-zinc-900"
      ></span>
    </AnatomyPart>

    <AnatomyPart
      text="Error Message or Description"
      position="bottom"
      class="mr-auto"
    >
      <span class="text-sm">Invalid code</span>
    </AnatomyPart>
  </div>
</template>

<script setup lang="ts">
import AnatomyPart from './AnatomyPart.vue';
</script>
