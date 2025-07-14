<template>
  <motion.div
    ref="el"
    :animate="{
      height: isExpanded
        ? 'auto'
        : `${actualHeight < 300 ? actualHeight : 300}px`,
    }"
    v-show="active"
    :data-file-name="name"
    :hidden="hidden || props.previewOnly"
    :class="{ expanded: isExpanded }"
  >
    <slot />

    <template v-if="actualHeight > 300">
      <button
        type="button"
        class="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer items-center gap-1 rounded-md bg-zinc-950 px-2 py-1 text-xs font-medium text-zinc-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:text-zinc-300"
        @click="isExpanded = !isExpanded"
      >
        <PhCaretDown class="size-4" :class="{ 'rotate-180': isExpanded }" />
        {{ isExpanded ? 'Collapse' : 'Expand' }}
      </button>
      <div
        class="expand-container absolute bottom-0 flex h-10 w-full items-center justify-center"
      ></div>
    </template>
  </motion.div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v';
import { nextTick, ref, watchEffect } from 'vue';
import PhCaretDown from '~icons/ph/caret-down-bold';

const isExpanded = ref(false);
const actualHeight = ref(300);
const el = ref<HTMLElement>();

const props = defineProps<{
  name: string;
  hidden?: boolean;
  active?: boolean;
  previewOnly?: boolean;
}>();

watchEffect(async () => {
  if (!props.active || !el.value) {
    return;
  }

  await nextTick();
  const height = (el.value as any).$el
    .querySelector('pre')
    ?.getBoundingClientRect().height;

  actualHeight.value = Math.ceil(height);
});
</script>

<style scoped>
@reference '@inject-css';

[data-file-name] {
  position: relative;
  overflow: hidden;

  .expand-container {
    @apply bg-gradient-to-b from-transparent to-zinc-950/50 transition-opacity duration-200;
  }

  &.expanded {
    .expand-container {
      @apply opacity-0;
    }
  }
}
</style>
