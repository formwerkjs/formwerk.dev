<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  code: string;
  label?: string;
}>();

function keyboardSymbol(key: string, os = 'mac') {
  const baseFormats = {
    CapsLock: '⇪',
    Shift: '⇧',
    ArrowUp: '↑',
    ArrowRight: '→',
    ArrowDown: '↓',
    ArrowLeft: '←',
    Enter: '↩',
    Backspace: '⌫',
    Delete: '⌦',
    Escape: 'Esc',
    Tab: '⇥',
    PageUp: '⇞',
    PageDown: '⇟',
    Space: '⎵',
  };

  const macFormats = {
    control: '⌃',
    alt: '⌥',
    option: '⌥',
    meta: '⌘',
    super: '⌘',
    cmd: '⌘',
    command: '⌘',
  };

  const winFormats = {
    control: 'ctrl',
    option: 'alt',
    meta: '❖',
    super: '❖',
    cmd: '❖',
    command: '❖',
  };

  const formats: Record<string, string> =
    os === 'mac'
      ? { ...baseFormats, ...macFormats }
      : { ...baseFormats, ...winFormats };

  return formats[key];
}

const key = computed(() => {
  const sym = keyboardSymbol(props.code);

  return {
    exists: !!sym,
    text: sym || props.code,
  };
});
</script>

<template>
  <span class="kbd">
    <kbd class="key-part" :class="key.exists ? 'key-sym' : 'key-text'">
      {{ key.text }}
    </kbd>

    <span v-if="label && key.exists" class="key-part key-text">
      {{ label }}
    </span>

    <div class="notch"></div>
  </span>
</template>

<style scoped>
@reference '@inject-css';

.kbd {
  @apply relative box-border inline-flex h-7 items-center gap-1 overflow-hidden rounded-md border border-gray-200 bg-gray-300 px-2 pb-0.5 text-center align-baseline leading-none capitalize transition-colors duration-100 select-none dark:border-gray-500 dark:bg-gray-800;

  .key-part {
    @apply leading-none transition-transform duration-100;
  }

  .key-sym {
    @apply font-mono text-lg;
  }

  .key-text {
    @apply text-[13px] font-medium whitespace-nowrap;
  }

  .notch {
    @apply absolute inset-x-0 bottom-0 h-0.5 bg-gray-400 transition-transform duration-100 dark:bg-gray-500;
  }

  &:active {
    @apply border-gray-400 dark:border-gray-600;

    .key-part {
      @apply translate-y-px;
    }

    .notch {
      @apply scale-y-0;
    }
  }
}
</style>
