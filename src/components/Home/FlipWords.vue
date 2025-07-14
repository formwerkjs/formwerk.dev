<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core';
import { ref, computed } from 'vue';

interface Props {
  words: string[];
  duration?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
  class: '',
});

const currentWordIndex = ref(0);
const biggestWord = computed(() => {
  return props.words.reduce((acc, word) => {
    return word.length > acc.length ? word : acc;
  }, '');
});

useIntervalFn(() => {
  currentWordIndex.value = (currentWordIndex.value + 1) % props.words.length;
}, props.duration);
</script>

<template>
  <div class="relative inline-block">
    <div class="invisible">{{ biggestWord }}</div>
    <div class="viewport absolute inset-0 h-full w-full">
      <Transition name="flip" mode="out-in">
        <span :key="currentWordIndex" :class="class">
          {{ props.words[currentWordIndex] }}
        </span>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
@reference '@inject-css';

.viewport {
  display: flex;
  flex-direction: column;
  overflow: clip;
}

.flip-enter-active,
.flip-leave-active {
  transition: transform 0.3s ease-in-out;
}

.flip-enter-from {
  transform: translateY(-75px);
}

.flip-leave-to {
  transform: translateY(75px);
}
</style>
