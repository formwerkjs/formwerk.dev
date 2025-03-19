<template>
  <div class="absolute right-2 top-3 flex flex-col items-end gap-1 text-xs">
    <label for="view-select">State</label>
    <select id="view-select" class="rounded-md py-1 text-sm" v-model="state">
      <option value="closed">Closed</option>
      <option value="open">Open</option>
    </select>
  </div>

  <div class="flex w-full max-w-sm flex-col items-center">
    <component
      :is="state === 'closed' ? AnatomyComboBoxClosed : AnatomyComboBoxOpen"
    />
  </div>
</template>

<script setup lang="ts">
import AnatomyComboBoxClosed from './AnatomyComboBoxClosed.vue';
import AnatomyComboBoxOpen from './AnatomyComboBoxOpened.vue';
import { ref } from 'vue';

const state = ref<'closed' | 'open'>('closed');
</script>
