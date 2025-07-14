<template>
  <div class="not-content inline-flex items-end gap-1">
    <svg
      class="size-full flex-shrink-0"
      viewBox="40 20 30 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Mouse body -->
      <rect
        class="mouse"
        x="35"
        y="20"
        width="40"
        height="60"
        rx="15"
        ry="15"
        stroke-width="2"
        stroke="#71717a"
      />

      <!-- Mouse wheel -->
      <rect
        class="wheel"
        :class="{ reverse: direction === 'down' }"
        x="50"
        y="40"
        width="10"
        height="20"
        rx="5"
        ry="5"
      />
    </svg>

    <span class="font-mono text-sm leading-none">{{
      `Wheel ${direction}`
    }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  direction: 'up' | 'down';
}>();
</script>

<style scoped>
@reference '@inject-css';

.wheel {
  @apply fill-current text-zinc-700 dark:text-zinc-400;
  animation: scrollUp 1s infinite;

  &.reverse {
    animation-direction: reverse;
  }
}

.mouse {
  @apply fill-current text-zinc-400 dark:text-zinc-700;
}

@keyframes scrollUp {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
