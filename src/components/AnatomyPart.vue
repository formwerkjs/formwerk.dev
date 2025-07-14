<template>
  <div class="AnatomyPopover" v-bind="$attrs">
    <slot />
  </div>

  <div
    class="AnatomyPopover__popover text-sm font-medium text-zinc-500 italic dark:dark:text-zinc-400"
    :class="[`is-${direction}`, mirrored ? 'is-mirrored' : '']"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue';

const {
  text,
  position = 'top',
  distance = 40,
} = defineProps<{
  text: string;
  distance?: number;
  mirrored?: boolean;
  position?:
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top right'
    | 'top left'
    | 'bottom right'
    | 'bottom left'
    | 'top span-left'
    | 'top span-right'
    | 'bottom span-left'
    | 'bottom span-right';
}>();

const id = `--${useId()}`;
const direction = position.split(' ')[0];
const length = `${distance}px`;

defineOptions({
  inheritAttrs: false,
});
</script>

<style>
@reference '@inject-css';

.AnatomyPopover {
  anchor-name: v-bind(id);
}

.AnatomyPopover__popover {
  @apply absolute inset-0 flex items-center;

  position-anchor: v-bind(id);
  position-area: v-bind(position);
  inset-area: v-bind(position);

  &::after {
    content: '';
    @apply ml-1 block h-px bg-zinc-400 dark:bg-zinc-400;
    order: 1;
    width: v-bind(length);
  }

  &::before {
    content: '';
    @apply block size-1 rounded-full bg-zinc-400 dark:bg-zinc-400;
    order: 2;
  }

  &.is-top,
  &.is-center {
    @apply mb-1 flex-col;

    &::after {
      width: 1px;
      height: v-bind(length);
      @apply ml-0;
    }
  }

  &.is-bottom {
    @apply mt-1 flex-col-reverse;

    &::after {
      width: 1px;
      height: v-bind(length);
      @apply ml-0;
    }
  }

  &.is-right {
    @apply ml-1 flex-row-reverse;

    &::after {
      @apply mr-1 ml-0;
    }
  }

  &.is-left {
    @apply mr-1;
  }

  &.is-center {
    @apply -translate-y-1/2;

    &.is-mirrored {
      @apply translate-y-1/2 flex-col-reverse;
    }
  }
}
</style>
