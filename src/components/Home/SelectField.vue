<script setup lang="ts" generic="TOption extends { label: string }, TValue">
import { useSelect, type SelectProps } from '@formwerk/core';
import OptionItem from '@components/Home/OptionItem.vue';
import OptionGroup from '@components/Home/OptionGroup.vue';
import { computed, ref, useId } from 'vue';
import { useFloating, autoUpdate } from '@floating-ui/vue';

export interface TheProps<TOption, TValue>
  extends SelectProps<TOption, TValue> {
  groups?: { items: TOption[]; label: string }[];
  options?: TOption[];
  getOptionValue?: (option: TOption) => TValue;
  size?: 'sm' | 'lg';
}

const props = withDefaults(defineProps<TheProps<TOption, TValue>>(), {
  size: 'sm',
});

const id = `--id-${useId()}`;
const triggerEl = ref<HTMLElement | null>(null);

const {
  triggerProps,
  labelProps,
  errorMessageProps,
  isTouched,
  fieldValue,
  listBoxProps,
  listBoxEl,
  errorMessage,
  isPopupOpen,
} = useSelect(props);

let floatingStyles = ref({});
const useJSPlacement = import.meta.env.SSR
  ? false
  : !CSS.supports('position-area: bottom') && !CSS.supports('position-anchor');

if (useJSPlacement) {
  floatingStyles = useFloating(triggerEl, listBoxEl, {
    placement: 'bottom-start',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
  }).floatingStyles as any;
}

const selectedOption = computed(() => {
  return props.options?.find((option) => {
    if (props.getOptionValue) {
      return props.getOptionValue(option) === fieldValue.value;
    }

    return (option as unknown as TValue) === fieldValue.value;
  });
});
</script>

<template>
  <div
    class="InputSelect"
    :class="{
      touched: isTouched,
      'size-sm': size === 'sm',
      'size-lg': size === 'lg',
    }"
  >
    <div class="label" v-bind="labelProps">{{ label }}</div>

    <div
      v-bind="triggerProps"
      ref="triggerEl"
      class="trigger flex items-center gap-2.5"
      :class="{ 'has-value': !!fieldValue }"
    >
      <template v-if="selectedOption">
        <slot name="selected" :option="selectedOption">
          {{ selectedOption.label }}
        </slot>
      </template>

      <template v-else>
        {{ 'Select an option' }}
      </template>

      <span class="ml-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="dropdown-icon fill-current text-zinc-400"
          viewBox="0 0 256 256"
        >
          <path
            d="M184.49,167.51a12,12,0,0,1,0,17l-48,48a12,12,0,0,1-17,0l-48-48a12,12,0,0,1,17-17L128,207l39.51-39.52A12,12,0,0,1,184.49,167.51Zm-96-79L128,49l39.51,39.52a12,12,0,0,0,17-17l-48-48a12,12,0,0,0-17,0l-48,48a12,12,0,0,0,17,17Z"
          ></path>
        </svg>
      </span>
    </div>

    <div
      v-bind="listBoxProps"
      popover
      class="listbox"
      :style="floatingStyles"
      :class="{ 'is-anchor-positioned': !useJSPlacement }"
    >
      <slot>
        <template v-if="groups">
          <OptionGroup
            v-for="group in groups"
            :key="group.label"
            :label="group.label"
          >
            <slot name="group" :options="group.items">
              <OptionItem
                v-for="(option, idx) in group.items"
                :key="(option as any) ?? idx"
                :value="getOptionValue?.(option) ?? option"
                :label="option.label"
              >
                <slot name="option" :option="option">
                  {{ option.label }}
                </slot>
              </OptionItem>
            </slot>
          </OptionGroup>
        </template>

        <div v-else-if="options" class="flex flex-col gap-1 p-2">
          <OptionItem
            v-for="(option, idx) in options"
            :key="option.label ?? idx"
            :value="getOptionValue?.(option) ?? option"
            :label="option.label"
          >
            <slot name="option" :option="option" />
          </OptionItem>
        </div>
      </slot>
    </div>

    <span v-bind="errorMessageProps" class="error-message">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style scoped>
@reference '@inject-css';

.InputSelect {
  @apply relative w-full max-w-xs;
  margin-bottom: calc(1em * 1.5);

  .label {
    @apply mb-1 block w-full text-sm font-semibold whitespace-nowrap text-white;
  }

  .dropdown-icon {
    @apply h-6 w-6;
  }

  .trigger {
    @apply w-full cursor-pointer rounded-md border border-zinc-700 bg-zinc-800 py-3 pr-3 pl-4 whitespace-nowrap text-zinc-400 transition-all duration-200 focus:bg-zinc-900;
    anchor-name: v-bind(id);

    &:focus {
      @apply border-emerald-500 ring-1 ring-emerald-500 outline-none;
    }

    &:hover {
      @apply bg-zinc-900;
    }

    &.has-value {
      @apply text-white;
    }

    &[aria-disabled='true'] {
      @apply cursor-not-allowed hover:bg-zinc-800 focus:border-zinc-700 focus:bg-zinc-800 focus:ring-0;
    }
  }

  .error-message {
    @apply absolute left-0 text-sm text-red-500;
    bottom: calc(-1.5 * 1em);
  }

  &.size-sm {
    .label {
      @apply text-sm;
    }

    .trigger {
      @apply py-2 text-sm;
    }

    .dropdown-icon {
      @apply h-4 w-4;
    }
  }

  &:has([aria-disabled='true']) {
    @apply cursor-not-allowed opacity-40;
  }
}

.listbox {
  @apply relative m-0 mt-1 max-h-[60vh] w-[80vw] origin-top rounded-md border border-zinc-700 bg-zinc-900 p-0 opacity-0 shadow-lg lg:w-[280px];
  transform: scale(0.9);
  transition:
    display 0.1s allow-discrete,
    opacity 0.1s allow-discrete,
    transform 0.1s allow-discrete,
    overlay 0.1s allow-discrete;

  &.is-anchor-positioned {
    position-anchor: v-bind(id);
    position-area: bottom;
    inset-area: bottom;
  }

  &:popover-open {
    opacity: 1;
    transform: scale(1);
  }

  scrollbar-width: thin;
  overflow-y: auto;
  overflow-y: overlay;
  scrollbar-color: rgb(63 63 70) transparent;
}

@starting-style {
  .listbox:popover-open {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
