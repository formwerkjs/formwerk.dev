<template>
  <a
    class="not-content flex flex-col overflow-hidden rounded-lg bg-zinc-500 shadow-sm transition-colors duration-200 dark:bg-zinc-800 dark:shadow-none"
    :href="link"
    :target="external ? '_blank' : undefined"
    rel="noopener noreferrer"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="h-40 bg-gray-300">
      <slot>
        <video
          ref="videoEl"
          loop
          muted
          :src="src"
          role="presentation"
          :poster="src?.replace('.mp4', '.webp')"
          class="h-full w-full object-cover"
        />
      </slot>
    </div>

    <div class="p-4">
      <p class="text-base font-bold text-white">{{ title }}</p>
      <p class="mt-2 text-balance text-sm text-white">
        {{ description }}
      </p>
    </div>
  </a>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title: string;
  description: string;
  src?: string;
  link: string;
  external?: boolean;
}>();

const videoEl = ref<HTMLVideoElement | null>(null);

const onEnter = () => {
  videoEl.value?.play();
};

const onLeave = () => {
  videoEl.value?.pause();
};
</script>

<style lang="postcss" scoped>
a {
  text-decoration: none;
}
</style>
