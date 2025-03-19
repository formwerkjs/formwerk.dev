<template>
  <div class="flex w-full flex-col items-center">
    <AnatomyPart
      text="Radio Group"
      :distance="40"
      position="right"
      class="rounded-md border border-dashed border-zinc-500 p-4"
    >
      <AnatomyPart text="Group Label" position="left">
        <span>Choose Drink</span>
      </AnatomyPart>

      <div class="ml-4 mt-4 flex flex-col pr-8">
        <div class="flex items-center gap-1">
          <PhRadioButton class="size-6 text-zinc-500" />
          Tea
        </div>
        <AnatomyPart text="Input" :distance="30" position="left">
          <div class="flex items-center gap-1">
            <PhRadioButtonFill class="size-6 text-zinc-500" />
            Coffee
          </div>
        </AnatomyPart>
        <div class="flex items-center gap-1">
          <PhRadioButton class="size-6 text-zinc-500" />
          <AnatomyPart text="Radio Label" :distance="20" position="bottom">
            Water
          </AnatomyPart>
        </div>
      </div>
    </AnatomyPart>
  </div>
</template>

<script setup lang="ts">
import AnatomyPart from './AnatomyPart.vue';
import PhRadioButton from '~icons/ph/radio-button';
import PhRadioButtonFill from '~icons/ph/radio-button-fill';
</script>
